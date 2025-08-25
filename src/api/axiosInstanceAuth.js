import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.mekto.com.br', // URL base da API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
