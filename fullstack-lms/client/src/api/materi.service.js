// src/api/materi.service.js
import apiClient from './axios';

export const materialService = {
  // GET /api/v1/categories
  getCategories: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  // GET /api/v1/materials?category_id=...&search=...
  getMaterials: async (params) => {
    const response = await apiClient.get('/materials', { params });
    return response.data;
  },

  // GET /api/v1/materials/:slug
  getMaterialBySlug: async (slug) => {
    const response = await apiClient.get(`/materials/${slug}`);
    return response.data;
  },

  // GET /api/v1/users/me/materials
  getUserMaterials: async () => {
    const response = await apiClient.get('/users/me/materials');
    return response.data;
  },

  // POST /api/v1/materials
  createMaterial: async (payload) => {
    const response = await apiClient.post('/materials', payload);
    return response.data;
  },

  // GET /api/v1/materials/:id
  getMaterialById: async (id) => {
    const response = await apiClient.get(`/materials/${id}`);
    return response.data;
  },

  // PUT /api/v1/materials/:id (TAMBAHAN UTK EDIT)
  updateMaterial: async (id, payload) => {
    const response = await apiClient.put(`/materials/${id}`, payload);
    return response.data;
  },

  // DELETE /api/v1/materials/:id (TAMBAHAN UTK HAPUS)
  deleteMaterial: async (id) => {
    const response = await apiClient.delete(`/materials/${id}`);
    return response.data;
  },

  // POST /api/v1/materials/:id/complete
  completeMaterial: async (id) => {
    const response = await apiClient.post(`/materials/${id}/complete`, {});
    return response.data;
  }
};