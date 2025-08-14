// requestService.js
import api from './axiosInstance'

// Função para obter o token do localStorage
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user?.token) return {}

  // Se for Bearer token:
  // return { Authorization: `Bearer ${user.token}` }

  // Se for Basic Authorization:
  return { Authorization: `Basic ${btoa(`${user.username}:${user.token}`)}` }
}

const requestService = {
  get: async (url, config = {}) => {
    const headers = { ...getAuthHeader(), ...config.headers }
    const response = await api.get(url, { ...config, headers })
    return response.data
  },

  post: async (url, data, config = {}) => {
    const headers = { ...getAuthHeader(), ...config.headers }
    const response = await api.post(url, data, { ...config, headers })
    return response.data
  },

  put: async (url, data, config = {}) => {
    const headers = { ...getAuthHeader(), ...config.headers }
    const response = await api.put(url, data, { ...config, headers })
    return response.data
  },

  delete: async (url, config = {}) => {
    const headers = { ...getAuthHeader(), ...config.headers }
    const response = await api.delete(url, { ...config, headers })
    return response.data
  },
}

export default requestService
