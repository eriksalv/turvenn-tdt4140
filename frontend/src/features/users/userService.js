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

const authService = { getUsers, getUser };

export default authService;
