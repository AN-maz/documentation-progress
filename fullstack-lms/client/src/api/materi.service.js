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
};