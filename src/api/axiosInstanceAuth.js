import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // URL base da API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
