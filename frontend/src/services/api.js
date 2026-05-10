import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
};

export const tripService = {
  getAll: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
};

export const cityService = {
  getAll: () => api.get('/cities'),
  getById: (id) => api.get(`/cities/${id}`),
};

export const activityService = {
  getAll: () => api.get('/activities'),
  getByCity: (cityId) => api.get(`/activities?city_id=${cityId}`),
};

export const budgetService = {
  getByTrip: (tripId) => api.get(`/budget?trip_id=${tripId}`),
  update: (id, data) => api.put(`/budget/${id}`, data),
};

export const checklistService = {
  getByTrip: (tripId) => api.get(`/checklist?trip_id=${tripId}`),
  addItem: (data) => api.post('/checklist', data),
  updateItem: (id, data) => api.put(`/checklist/${id}`, data),
  deleteItem: (id) => api.delete(`/checklist/${id}`),
};

export const noteService = {
  getByTrip: (tripId) => api.get(`/notes?trip_id=${tripId}`),
  addNote: (data) => api.post('/notes', data),
  updateNote: (id, data) => api.put(`/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

export default api;
