// productProvider.js
import requestService from '../services/requestService'

export const productProvider = {
  // Busca paginada geral
  getAll: (page = 0, size = 20) =>
    requestService.get(`/products?page=${page}&size=${size}`),

  // Busca paginada por query
  getQuery: (page = 0, size = 20, query = '') =>
    requestService.get(`/products/search/${encodeURIComponent(query)}?page=${page}&size=${size}`),

  getById: (id) => requestService.get(`/products/${id}`),
  create: (data) => requestService.post('/products', data),
  update: (id, data) => requestService.put(`/products/${id}`, data),
  remove: (id) => requestService.delete(`/products/${id}`),
}
