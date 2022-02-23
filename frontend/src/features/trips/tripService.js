import axios from 'axios';

const baseUrl = '/api/trips';

const getTrips = async () => {
  const res = await axios.get(baseUrl);

  return res.data;
};

const getTrip = async (tripId) => {
  const res = await axios.get(`${baseUrl}/${tripId}`);

  return res.data;
};

const getUserTrips = async (userId) => {
  const res = await axios.get(`/api/users/${userId}/trips`);

  return res.data;
};

const createTrip = async (tripData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const res = await axios.post(baseUrl, tripData, config);

  return res.data;
};

const tripService = { getTrips, getTrip, getUserTrips, createTrip };

export default tripService;
