import axios from 'axios';

const baseUrl = '/api/trips';

const getLogs = async () => {
  const res = await axios.get(baseUrl);

  return res.data;
};

const getLog = async (logId) => {
  const res = await axios.get(`${baseUrl}/${logId}`);

  return res.data;
};

const createLog = async (logData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const res = await axios.post(baseUrl, logData, config);

  return res.data;
};

const tripService = {
  getLogs,
  getLog,
  createLog
};

export default tripService;
