import axios from 'axios';

const baseUrl = '/api/trips';

const getLogs = async (tripId) => {
  const res = await axios.get(`${baseUrl}/${tripId}/logs`);

  return res.data;
};

const createLog = async (logData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const res = await axios.post(`${baseUrl}/${logData.tripId}/logs`, logData, config);

  return res.data;
};

const tripService = {
  getLogs,
  createLog
};

export default tripService;
