const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

/**
 * @desc    Create new order from user cart / provided checkout details
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = 'cod', items: directItems } = req.body;

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode) {
      return res.status(400).json({ message: 'Complete shipping address is required' });
    }

    let cartItemsToOrder = [];

    // If items provided directly in request body (e.g. guest conversion or direct checkout)
    if (directItems && Array.isArray(directItems) && directItems.length > 0) {
      cartItemsToOrder = directItems;
    } else {
      // Fetch items from active DB cart
      const cart = await Cart.findOne({ userId: req.user._id });
      if (!cart || !cart.items || cart.items.length === 0) {
        return res.status(400).json({ message: 'Your shopping cart is empty' });
      }
      cartItemsToOrder = cart.items;
    }

    const orderItems = [];
    let subtotal = 0;

    // Validate stock and snapshot live server prices
    for (const item of cartItemsToOrder) {
      const pId = item.productId._id || item.productId;
      const product = await Product.findById(pId);

      if (!product || !product.isActive) {
        return res.status(400).json({ message: `Product "${item.name || 'selected item'}" is no longer available` });
      }

      // Check variant stock
      const variant = product.variants.find(v => v.sku === item.sku);
      const stockAvailable = variant ? variant.stock : (product.stock !== undefined ? product.stock : 20);

      if (item.quantity > stockAvailable) {
        return res.status(400).json({
          message: `Insufficient stock for "${product.name}" (${item.size}, ${item.color}). Only ${stockAvailable} remaining.`
        });
      }

      const unitPrice = product.price; // Retrieve trusted server price
      const itemSubtotal = unitPrice * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        sku: item.sku || `${product.slug}-${item.size}-${item.color}`,
        size: item.size || 'Standard',
        color: item.color || 'Default',
        quantity: item.quantity,
        unitPrice
      });
    }

    // Backend price calculations
    const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 12.50;
    const tax = Number((subtotal * 0.08).toFixed(2));
    const totalAmount = Number((subtotal + shippingFee + tax).toFixed(2));

    // Create Order
    const order = new Order({
      userId: req.user._id,
      items: orderItems,
      subtotal: Number(subtotal.toFixed(2)),
      shippingFee,
      tax,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'processing'
    });

    const savedOrder = await order.save();

    // Reduce stock atomically for each ordered variant/product
    for (const item of orderItems) {
      await Product.updateOne(
        { _id: item.productId, 'variants.sku': item.sku },
        { $inc: { 'variants.$.stock': -item.quantity } }
      );
    }

    // Clear active cart after successful order creation
    await Cart.updateOne({ userId: req.user._id }, { $set: { items: [] } });

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

/**
 * @desc    Get order history of logged-in customer
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve order history', error: error.message });
  }
};

/**
 * @desc    Get order by ID (Accessible by owner or admin)
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure only order owner or admin can view order
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid order ID format' });
    }
    res.status(500).json({ message: 'Failed to retrieve order', error: error.message });
  }
};

/**
 * @desc    Update order status (Admin Only)
 * @route   PATCH /api/admin/orders/:id/status
 * @access  Private/Admin
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus
};
