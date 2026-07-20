import api from './api'

export const getProducts = async () => {
  const { data } = await api.get('/products?limit=30')
  return data.products
}

export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export const createProduct = async (product) => {
  const { data } = await api.post('/products/add', product)
  return data
}

export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product)
  return data
}

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`)
  return data
}
