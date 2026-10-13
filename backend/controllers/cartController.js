const Cart = require('../models/Cart');
const Product = require('../models/Product');

/**
 * Helper to populate product details and calculate cart totals using dynamic live prices from DB
 */
const formatCartResponse = async (cart) => {
  if (!cart || !cart.items || cart.items.length === 0) {
    return {
      _id: cart ? cart._id : null,
      userId: cart ? cart.userId : null,
      items: [],
      totalItems: 0,
      subtotal: 0,
      shippingFee: 0,
      tax: 0,
      totalPrice: 0
    };
  }

  const populatedItems = [];
  let subtotal = 0;
  let totalItems = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    if (product && product.isActive) {
      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;
      totalItems += item.quantity;

      populatedItems.push({
        productId: product._id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        image: product.images ? product.images[0] : '',
        sku: item.sku,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unitPrice: product.price,
        itemSubtotal
      });
    }
  }

  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 12.50;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const totalPrice = Number((subtotal + shippingFee + tax).toFixed(2));

  return {
    _id: cart._id,
    userId: cart.userId,
    items: populatedItems,
    totalItems,
    subtotal: Number(subtotal.toFixed(2)),
    shippingFee,
    tax,
    totalPrice
  };
};

/**
 * @desc    Fetch logged-in user cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }

    const response = await formatCartResponse(cart);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart', error: error.message });
  }
};

/**
 * @desc    Add product variant to cart
 * @route   POST /api/cart/add
 * @access  Private
 */
const addToCart = async (req, res) => {
  try {
    const { productId, sku, quantity = 1, size, color } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product is unavailable or does not exist' });
    }

    // Identify variant
    let matchedVariant = null;

    if (sku) {
      matchedVariant = product.variants.find(v => v.sku === sku);
    }

    if (!matchedVariant && (size || color)) {
      matchedVariant = product.variants.find(
        v => (!size || v.size === size) && (!color || v.color === color)
      );
    }

    // Fallback: If no explicit variant matched, construct size/color from request or defaults
    const finalSize = matchedVariant ? matchedVariant.size : (size || product.availableSizes[0] || 'Standard');
    const finalColor = matchedVariant ? matchedVariant.color : (color || product.availableColors[0] || 'Default');
    const finalSku = matchedVariant ? matchedVariant.sku : (sku || `${product.slug}-${finalSize}-${finalColor}`.toLowerCase());

    const availableStock = matchedVariant ? matchedVariant.stock : (product.stock !== undefined ? product.stock : 20);

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      item => item.productId.toString() === productId && item.sku === finalSku
    );

    const existingQty = existingIndex > -1 ? cart.items[existingIndex].quantity : 0;
    const requestedTotalQty = existingQty + Number(quantity);

    if (requestedTotalQty > availableStock) {
      return res.status(400).json({
        message: `Insufficient stock. Only ${availableStock} items available for SKU: ${finalSku}`
      });
    }

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity = requestedTotalQty;
    } else {
      cart.items.push({
        productId: product._id,
        sku: finalSku,
        size: finalSize,
        color: finalColor,
        quantity: Number(quantity)
      });
    }

    await cart.save();
    const formattedCart = await formatCartResponse(cart);
    res.json(formattedCart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
};

/**
 * @desc    Update quantity of item in cart
 * @route   PATCH /api/cart/update
 * @access  Private
 */
const updateCartItem = async (req, res) => {
  try {
    const { sku, quantity } = req.body;

    if (!sku) {
      return res.status(400).json({ message: 'SKU is required' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.sku === sku);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const newQty = Number(quantity);

    if (newQty <= 0) {
      // Remove item if quantity set to 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Stock check
      const item = cart.items[itemIndex];
      const product = await Product.findById(item.productId);
      if (product) {
        const variant = product.variants.find(v => v.sku === sku);
        const availableStock = variant ? variant.stock : (product.stock || 20);
        if (newQty > availableStock) {
          return res.status(400).json({
            message: `Only ${availableStock} items available in stock`
          });
        }
      }
      cart.items[itemIndex].quantity = newQty;
    }

    await cart.save();
    const formattedCart = await formatCartResponse(cart);
    res.json(formattedCart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart item', error: error.message });
  }
};

/**
 * @desc    Remove selected item from cart by SKU
 * @route   DELETE /api/cart/remove/:sku
 * @access  Private
 */
const removeCartItem = async (req, res) => {
  try {
    const { sku } = req.params;

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.sku !== sku);
    await cart.save();

    const formattedCart = await formatCartResponse(cart);
    res.json(formattedCart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
};

/**
 * @desc    Clear all items from user cart
 * @route   DELETE /api/cart/clear
 * @access  Private
 */
const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    const formattedCart = await formatCartResponse(cart);
    res.json(formattedCart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
