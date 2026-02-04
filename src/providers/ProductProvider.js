// productProvider.js
import requestService from '../services/requestService'

export const productProvider = {
    // Busca paginada geral
    // productProvider.js
    getAll: (limit = 20, nextPage = null, query = '') => {
        let url = `/products?limit=${limit}`

        if (query) {
            url = `/products/search?query=${query}&limit=${limit}`;
        }

        if (nextPage) {
            url += `&nextPage=${encodeURIComponent(nextPage)}`
        }

        return requestService.get(url)
    },

    getById: (id) => requestService.get(`/products/${id}`),
    create: (data) => requestService.post('/products', data),
    update: (id, data) => requestService.put(`/products/${id}`, data),
    remove: (id) => requestService.delete(`/products/${id}`),
}
