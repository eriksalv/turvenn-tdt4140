const { Trip, User, Log } = require('../models');

const createLog = async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    return next(new Error('text cannot be empty'));
  }

  const { tripId } = req.params;
  const trip = await Trip.findByPk(tripId);

  if (!trip) {
    res.status(404);
    return next(new Error('Trip not found'));
  }

  const { id } = req.user;
  const image = (req.file && req.file.filename) || null;

  try {
    const newLog = await Log.create({
      text,
      imageUrl: image,
      userId: id,
      tripId
    });
    return res.status(201).json({
      message: 'Log created successfully',
      trip: {
        text: newLog.name,
        imageUrl: newLog.imageUrl,
        userId: newLog.userId,
        tripId: newLog.id
      }
    });
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
    attributes: ['id', 'text', 'imageUrl', 'userId', 'tripId'],
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
