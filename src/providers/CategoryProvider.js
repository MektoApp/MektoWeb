import requestService from '../services/requestService'

export const categoryProvider = {
  getAll: () => requestService.get('/categories'),
  getById: (id) => requestService.get(`/categories/${id}`),
  create: (data) => requestService.post('/categories', data),
  update: (id, data) => requestService.put(`/categories/${id}`, data),
  remove: (id) => requestService.delete(`/categories/${id}`),
}
