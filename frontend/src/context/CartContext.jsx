import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // --- Cart State Persistence ---
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('urbanstep_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  // --- Wishlist State Persistence ---
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('urbanstep_wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e);
      return [];
    }
  });

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', product: null, type: 'cart' });

  useEffect(() => {
    try {
      localStorage.setItem('urbanstep_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('urbanstep_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const showToastNotification = (message, product = null, type = 'cart') => {
    setToast({ show: true, message, product, type });
    setTimeout(() => {
      setToast({ show: false, message: '', product: null, type: 'cart' });
    }, 3500);
  };

  // --- Cart Operations ---
  const addToCart = (product, size = null, color = null, quantity = 1) => {
    const selectedSize = size || (product.availableSizes ? product.availableSizes[0] : 'Standard');
    const selectedColor = color || (product.availableColors ? product.availableColors[0] : 'Default');
    const itemKey = `${product.id}-${selectedSize}-${selectedColor}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { itemKey, product, size: selectedSize, color: selectedColor, quantity }];
    });

    showToastNotification(`Added ${product.name} (${selectedSize}) to cart!`, product, 'cart');
  };

  const removeFromCart = (itemKey) => {
    setCart((prevCart) => prevCart.filter((item) => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.itemKey === itemKey ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- Wishlist Operations ---
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToastNotification(`Removed ${product.name} from Wishlist`, product, 'wishlist_remove');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToastNotification(`Saved ${product.name} to Wishlist!`, product, 'wishlist_add');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const moveToCart = (product, size = null, color = null) => {
    addToCart(product, size, color, 1);
    removeFromWishlist(product.id);
  };

  // --- Calculations ---
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 12.50;
  const tax = subtotal * 0.08;
  const totalPrice = subtotal + shippingFee + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveToCart,
        totalItems,
        wishlistCount,
        subtotal,
        shippingFee,
        tax,
        totalPrice,
        toast,
        hideToast: () => setToast({ show: false, message: '', product: null, type: 'cart' })
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
