import api from '../api/axiosInstanceAuth';

export const login = async (username, password) => {
  const response = await api.post('/auth/authenticate', { username, password });
  const user = response.data;

  // Armazenar username + password para Basic Auth
  const authUser = {
    ...user,
    username,
    password // precisa armazenar a senha para poder enviar no Basic Auth depois
  };

  localStorage.setItem('user', JSON.stringify(authUser));

  return authUser;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getProfile = async () => {
  const response = await api.get('/me');
  return response.data;
};
