import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  signup: (name, email, password) =>
    api.post('/users/register', { name, email, password }),
  signin: (email, password) =>
    api.post('/users/login', { email, password }),
  getProfile: () =>
    api.get('/users/profile'),
  updateProgress: (data) =>
    api.put('/users/progress', data),
};

export const courseAPI = {
  getCourses: () =>
    api.get('/courses'),
  getCourseById: (id) =>
    api.get(`/courses/${id}`),
  createCourse: (courseData) =>
    api.post('/courses', courseData),
};

export const orderAPI = {
  createOrder: (courseId, price) =>
    api.post('/orders', { courseId, price, paymentStatus: 'completed' }),
  getMyOrders: () =>
    api.get('/orders/myorders'),
};

export const paymentAPI = {
  createCheckoutSession: (items) =>
    api.post('/payment/create-checkout-session', { items }),
};

export const aiAPI = {
  askCoach: (payload) =>
    api.post('/ai/coach', payload),
};

export default api;
