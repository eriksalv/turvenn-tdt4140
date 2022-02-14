import axios from 'axios';

const baseUrl = 'api/users';

const login = async (userData) => {
  const res = await axios.post(`${baseUrl}/login`, userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  console.log(res);

  return res.data;
};

const authService = { login };

export default authService;
