import axios from 'axios';

export const API_BASE_URL =   `${import.meta.env.VITE_API_BASE_URL}/api`;


const api = axios.create({
  baseURL: `${API_BASE_URL}`, // URL base da API
  headers: {
    'Content-Type': 'application/json',
  },
});



export default api;
