import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  verifyToken: () => api.post('/auth/verify-token'),
};

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
  getAllAdmin: (params = {}) => api.get('/products/admin/all', { params }),
};

// Orders API
export const ordersAPI = {
  getAll: (params = {}) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  getByOrderNumber: (orderNumber, email) => 
    api.get(`/orders/number/${orderNumber}`, { params: { email } }),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  updatePaymentStatus: (id, data) => api.put(`/orders/${id}/payment-status`, data),
  getStats: (params = {}) => api.get('/orders/stats/summary', { params }),
};

// Checkout API
export const checkoutAPI = {
  createSession: (data) => api.post('/checkout/create-session', data),
  getSession: (sessionId) => api.get(`/checkout/session/${sessionId}`),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params = {}) => api.get('/analytics/dashboard', { params }),
  getSales: (params = {}) => api.get('/analytics/sales', { params }),
  getProducts: (params = {}) => api.get('/analytics/products', { params }),
};

export default api;
