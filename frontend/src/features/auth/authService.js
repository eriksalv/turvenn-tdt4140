import axios from 'axios';

const baseUrl = 'api/users';

const login = async (userData) => {
  const res = await axios.post(`${baseUrl}/login`, userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

const register = async (userData) => {
  const res = await axios.post(`${baseUrl}`, userData);
  if (res.data) {
    localStorage.setItem(`user`, JSON.stringify(res.data));
  }
  return res.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = { login, register, logout };

export default authService;
