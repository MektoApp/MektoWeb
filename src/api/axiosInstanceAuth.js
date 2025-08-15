import axios from 'axios';

const api = axios.create({
  baseURL: 'http://pecaapeca.app.br:8085', // URL base da API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
