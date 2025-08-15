import requestService from '../services/requestService'

export const subCategoryProvider = {
  getAll: () => requestService.get('/subCategories'),
  getById: (id) => requestService.get(`/subCategories/${id}`),
  create: (data) => requestService.post('/subCategories', data),
  update: (id, data) => requestService.put(`/subCategories/${id}`, data),
  remove: (id) => requestService.delete(`/subCategories/${id}`),
}
