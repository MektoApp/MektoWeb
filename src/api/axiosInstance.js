import axios from 'axios';

const api = axios.create({
  baseURL: 'http://pecaapeca.app.br:8085', // URL base da API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
