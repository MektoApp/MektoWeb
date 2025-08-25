import axios from 'axios';

export const API_BASE_URL = 'https://api.mekto.com.br/api';


const api = axios.create({
  baseURL: `${API_BASE_URL}`, // URL base da API
  headers: {
    'Content-Type': 'application/json',
  },
});



export default api;
