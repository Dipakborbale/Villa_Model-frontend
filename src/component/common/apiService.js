// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5211/'; // Replace with your .NET API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = (userData) => apiService.post('http://localhost:5211/api/auth/register', userData);

export const login = (userData) => apiService.post('http://localhost:5211/api/auth/login', userData);

// Add more API calls as needed
apiService.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default apiService;
