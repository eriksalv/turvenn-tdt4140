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

  const { tripId, image, text } = logData;

  const res = await axios.post(
    `${baseUrl}/${logData.tripId}/logs`,
    { tripId, image: image.name, text },
    config
  );
  config.headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`
  };

  const formData = new FormData(image);

  await axios.post(`${baseUrl}/${logData.tripId}/logs`, formData, config);

  return res.data;
};

const tripService = {
  getLogs,
  createLog
};

export default tripService;
