import api from './api'

export const loginUser = async (username, password) => {
  const { data } = await api.post('/auth/login', { username, password })
  return data
}
