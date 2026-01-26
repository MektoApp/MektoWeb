// productProvider.js
import requestService from '../services/requestService'

export const productProvider = {
    // Busca paginada geral
    getAll: (limit = 20, nextPage = null) => {
        let url = `/products?limit=${limit}`
        if (nextPage) {
            url += `&nextPage=${encodeURIComponent(nextPage)}`
        }
        return requestService.get(url)
    },

    // Busca paginada por query
        getQuery: (page = 0, size = 20, query = '') =>
        requestService.get(`/products/search/${encodeURIComponent(query)}?page=${page}&size=${size}`),

    getById: (id) => requestService.get(`/products/${id}`),
    create: (data) => requestService.post('/products', data),
    update: (id, data) => requestService.put(`/products/${id}`, data),
    remove: (id) => requestService.delete(`/products/${id}`),
}
