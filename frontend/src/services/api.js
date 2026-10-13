// Central API service for connecting React frontend to Express/MongoDB backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to retrieve stored JWT auth token from localStorage
 */
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('urbanstep_user') || 'null');
  const token = user?.token || localStorage.getItem('urbanstep_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

/**
 * Generic request wrapper with error handling
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error(`[API Call Error] ${endpoint}:`, error.message);
    throw error;
  }
};

export const api = {
  // --- Products ---
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return request(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getProductById: (id) => request(`/products/${id}`),

  getProductBySlug: (slug) => request(`/products/slug/${slug}`),

  // --- Auth ---
  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  getProfile: () => request('/auth/me'),

  // --- Cart ---
  getCart: () => request('/cart'),

  addToCart: (item) =>
    request('/cart/add', {
      method: 'POST',
      body: JSON.stringify(item)
    }),

  updateCart: (sku, quantity) =>
    request('/cart/update', {
      method: 'PATCH',
      body: JSON.stringify({ sku, quantity })
    }),

  removeFromCart: (sku) =>
    request(`/cart/remove/${sku}`, {
      method: 'DELETE'
    }),

  clearCart: () =>
    request('/cart/clear', {
      method: 'DELETE'
    }),

  // --- Orders ---
  createOrder: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    }),

  getMyOrders: () => request('/orders/my-orders'),

  getOrderById: (id) => request(`/orders/${id}`),

  // --- Admin ---
  getAdminDashboard: () => request('/admin/dashboard'),
  getAdminOrders: () => request('/admin/orders')
};

export default api;
