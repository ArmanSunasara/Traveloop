import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

export const tripService = {
  getAll: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
  getPublic: (id) => api.get(`/trips/${id}/public`),
  getStops: (tripId) => api.get(`/trips/${tripId}/stops`),
  addStop: (tripId, data) => api.post(`/trips/${tripId}/stops`, data),
};

export const stopService = {
  update: (id, data) => api.put(`/stops/${id}`, data),
  delete: (id) => api.delete(`/stops/${id}`),
  addActivity: (stopId, activityId) => api.post(`/stops/${stopId}/activities`, { activity_id: activityId }),
  removeActivity: (stopId, activityId) => api.delete(`/stops/${stopId}/activities/${activityId}`),
};

export const cityService = {
  getAll: (params) => api.get('/cities', { params }),
  getById: (id) => api.get(`/cities/${id}`),
};

export const activityService = {
  getAll: (params) => api.get('/activities', { params }),
  getByCity: (cityId) => api.get('/activities', { params: { city_id: cityId } }),
};

export const budgetService = {
  getByTrip: (tripId) => api.get(`/budget/trips/${tripId}`),
  update: (tripId, data) => api.put(`/budget/trips/${tripId}`, data),
};

export const checklistService = {
  getByTrip: (tripId) => api.get(`/checklist/trips/${tripId}`),
  addItem: (tripId, data) => api.post(`/checklist/trips/${tripId}`, data),
  updateItem: (itemId, data) => api.put(`/checklist/${itemId}`, data),
  deleteItem: (itemId) => api.delete(`/checklist/${itemId}`),
};

export const noteService = {
  getByTrip: (tripId) => api.get(`/notes/trips/${tripId}`),
  addNote: (tripId, data) => api.post(`/notes/trips/${tripId}`, data),
  updateNote: (id, data) => api.put(`/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

export const userService = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  deleteAccount: () => api.delete('/users/me'),
};

export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
};

export default api;
