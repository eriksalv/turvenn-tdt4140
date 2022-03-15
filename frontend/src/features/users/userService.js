import axios from 'axios';

const baseUrl = '/api/users';

const getUsers = async () => {
  const res = await axios.get(`${baseUrl}`);

  return res.data;
};

const getUser = async (userId) => {
  const res = await axios.get(`${baseUrl}/${userId}`);

  return res.data;
};

const changeRoleAdmin = async (userId, role, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const res = await axios.put(`${baseUrl}/${userId}/role`, { role }, config);

  return res.data;
};

const authService = { getUsers, getUser, changeRoleAdmin };

export default authService;
