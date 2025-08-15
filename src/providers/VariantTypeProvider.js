import requestService from '../services/requestService'

export const variantTypeProvider = {
  getAll: () => requestService.get('/variantTypes'),
  getById: (id) => requestService.get(`/variantTypes/${id}`),
  create: (data) => requestService.post('/variantTypes', data),
  update: (id, data) => requestService.put(`/variantTypes/${id}`, data),
  remove: (id) => requestService.delete(`/variantTypes/${id}`),
}
