import api from './axios'

export const adminService = {
  // --- Dashboard Stats ---
  getStats: async () => {
    const response = await api.get('/admin/stats')
    return response.data
  },

  // --- Moderation ---
  getPendingMaterials: async () => {
    const response = await api.get('/admin/materials')
    return response.data
  },

  updateMaterialStatus: async (id, status, rejectionReason = null) => {
    const response = await api.patch(`/admin/materials/${id}/status`, {
      status,
      rejection_reason: rejectionReason
    })
    return response.data
  },

  // --- Categories Management ---
  getCategories: async () => {
    const response = await api.get('/admin/categories')
    return response.data
  },

  createCategory: async (name) => {
    const response = await api.post('/admin/categories', { name })
    return response.data
  },

  updateCategory: async (id, name) => {
    const response = await api.put(`/admin/categories/${id}`, { name })
    return response.data
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/admin/categories/${id}`)
    return response.data
  }
}