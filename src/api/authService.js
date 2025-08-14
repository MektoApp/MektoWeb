import api from './axiosInstance';

export const login = async (username, password) => {
  const response = await api.post('/auth/authenticate', { username, password });
  const user = response.data;

  // Armazena o usuário no localStorage
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getProfile = async () => {
  const response = await api.get('/me');
  return response.data;
};
