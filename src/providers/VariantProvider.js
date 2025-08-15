import requestService from '../services/requestService'

export const variantProvider = {
  getAll: () => requestService.get('/variants'),
  getById: (id) => requestService.get(`/variants/${id}`),
  create: (data) => requestService.post('/variants', data),
  update: (id, data) => requestService.put(`/variants/${id}`, data),
  remove: (id) => requestService.delete(`/variants/${id}`),
}
