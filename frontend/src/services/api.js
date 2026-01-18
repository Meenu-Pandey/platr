import axios from 'axios';

// Centralized API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Error handling is done at the component level
    return Promise.reject(error);
  }
);

// API service methods
export const authAPI = {
  // User auth
  registerUser: (data) => api.post('/auth/user/register', data),
  loginUser: (data) => api.post('/auth/user/login', data),
  logoutUser: () => api.get('/auth/user/logout'),
  
  // Food partner auth
  registerFoodPartner: (data) => api.post('/auth/food-partner/register', data),
  loginFoodPartner: (data) => api.post('/auth/food-partner/login', data),
  logoutFoodPartner: () => api.get('/auth/food-partner/logout'),
};

export const foodAPI = {
  getFoodItems: (params) => api.get('/food', { params }),
  createFood: (formData) => api.post('/food', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  likeFood: (foodId) => api.post('/food/like', { foodId }),
  saveFood: (foodId) => api.post('/food/save', { foodId }),
  getSavedFoods: () => api.get('/food/save'),
  addComment: (foodId, text) => api.post('/food/comment', { foodId, text }),
  getComments: (foodId) => api.get(`/food/${foodId}/comments`),
};

export const foodPartnerAPI = {
  getFoodPartnerById: (id) => api.get(`/food-partner/${id}`),
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (foodId, quantity = 1) => api.post('/cart', { foodId, quantity }),
  updateCartItem: (foodId, quantity) => api.put(`/cart/${foodId}`, { quantity }),
  removeFromCart: (foodId) => api.delete(`/cart/${foodId}`),
  clearCart: () => api.delete('/cart'),
};

export const orderAPI = {
  placeOrder: (data) => api.post('/order', data),
  getUserOrders: () => api.get('/order'),
  getOrderById: (orderId) => api.get(`/order/${orderId}`),
};

export default api;

