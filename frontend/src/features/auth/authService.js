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
  console.log(userData);
  const res = await axios.post(`${baseUrl}`, userData);
  if (res.data) {
    localStorage.setItem(`user`, JSON.stringify(res.data));
  }
  return res.data;
};

const authService = { login, register };

export default authService;
