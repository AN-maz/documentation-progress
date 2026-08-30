import apiClient from './axios';

export const authService = {
  login: async (credentials) => {
    // POST /api/v1/auth/login
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    // POST /api/v1/auth/register
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
};