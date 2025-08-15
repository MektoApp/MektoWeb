import requestService from '../services/requestService'

export const brandProvider = {
  getAll: () => requestService.get('/brands'),
  getById: (id) => requestService.get(`/brands/${id}`),
  create: (data) => requestService.post('/brands', data),
  update: (id, data) => requestService.put(`/brands/${id}`, data),
  remove: (id) => requestService.delete(`/brands/${id}`),
}
