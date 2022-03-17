const { Trip, User, Log } = require('../models');

const createLog = async (req, res, next) => {
  const { text, imageUrl } = req.body;

  if (!text) {
    res.status(400);
    return next(new Error('text cannot be empty'));
  }

  const { tripId } = req.params;
  const trip = Trip.findByPk(tripId);

  if (!trip) {
    res.status(404);
    return next(new Error('Trip not found'));
  }

  const { id } = req.user;

  try {
    const log = await Log.create({
      text,
      imageUrl,
      userId: id,
      tripId
    });
    return res.status(200).json(log);
  } catch (error) {
    res.status(500);
    next(new Error('Something went wrong'));
  }
};

const getLogs = async (req, res, next) => {
  const { tripId } = req.params;

  const trip = await Trip.findByPk(tripId);

  if (!trip) {
    res.status(404);
    return next(new Error('Trip not found'));
  }

  const logs = await trip.getLogs({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'email']
      }
    ]
  });
  return res.status(200).json(logs);
};

module.exports = {
  createLog,
  getLogs
};
