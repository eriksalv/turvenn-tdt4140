const { Trip, User } = require('../models');

const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: [
        'id',
        'name',
        'start',
        'goal',
        'date',
        'difficulty',
        'type',
        'duration',
        'description',
        'createdAt'
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });
    return res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    res.status(500);
    next(new Error('Something went wrong'));
  }
};

const getUserTrips = async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    return next(new Error('User not found'));
  }

  try {
    const trips = await user.getTrips({
      attributes: [
        'id',
        'name',
        'start',
        'goal',
        'date',
        'difficulty',
        'type',
        'duration',
        'description'
      ]
    });

    return res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    res.status(500);
    next(new Error('Something went wrong'));
  }
};

const getTrip = async (req, res, next) => {
  const { tripId } = req.params;

  const trip = await Trip.findByPk(tripId, {
    attributes: [
      'id',
      'name',
      'start',
      'goal',
      'date',
      'difficulty',
      'type',
      'duration',
      'description',
      'createdAt'
    ],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'email']
      },
      {
        model: User,
        as: 'participators',
        attributes: ['id', 'firstName', 'lastName', 'email'],
        through: {
          attributes: []
        }
      }
    ]
  });

  if (!trip) {
    res.status(404);
    return next(new Error('Trip not found'));
  }

  return res.status(200).json(trip);
};

const createTrip = async (req, res, next) => {
  const { name, start, goal, date, difficulty, type, duration, description } = req.body;
  const userId = req.user.id;

  try {
    const newTrip = await Trip.create({
      name,
      start,
      goal,
      date,
      difficulty,
      type,
      duration,
      description,
      userId
    });
    return res.status(201).json({
      message: 'Trip created successfully',
      trip: {
        name: newTrip.name,
        start: newTrip.start,
        goal: newTrip.goal,
        date: newTrip.date,
        difficulty: newTrip.difficulty,
        type: newTrip.type,
        duration: newTrip.duration,
        description: newTrip.description
      }
    });
  } catch (error) {
    res.status(400);
    next(new Error('Invalid trip data'));
  }
};

const signUp = async (req, res, next) => {
  const { tripId } = req.params;
  const userId = req.user.id;

  const user = await User.findByPk(userId);
  const trip = await Trip.findByPk(tripId);

  if (!trip) {
    res.status(404);
    return next(new Error('Trip not found'));
  }

  try {
    await user.addParticipatedTrip(trip);
    return res.status(201).json({ message: 'Successfully signed up' });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(new Error('Something went wrong'));
  }
};

const signOff = async (req, res, next) => {
  const { tripId } = req.params;
  const userId = req.user.id;

  const user = await User.findByPk(userId);
  const trip = await Trip.findByPk(tripId);

  if (!trip) {
    res.status(404);
    return next(new Error('Trip not found'));
  }

  try {
    await user.removeParticipatedTrip(trip);
    return res.status(200).json({ message: 'Successfully signed off' });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(new Error('Something went wrong'));
  }
};

const deleteTrip = async (req, res, next) => {
  const { id, role } = req.user;
  const { tripId } = req.params;

  const trip = await Trip.findByPk(tripId);

  if (!trip) {
    res.status(404);
    return next(new Error('Trip not found'));
  }

  try {
    // TODO(Ola): gjøre så "groups" kan slette, ikke basert på brukerid for at admin kan også slette
    if (role !== 'admin' && trip.userId !== id)
      return res.status(403).json({ message: 'Unauthorized' });

    await trip.destroy();

    return res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(new Error('Something went wrong'));
  }
};

const updateTrip = async (req, res, next) => {
  const { name, start, goal, date, difficulty, type, duration, description } = req.body;
  const userId = req.user.id;
  const { tripId } = req.params;

  const trip = await Trip.findByPk(tripId);

  if (!trip) {
    res.status(404);
    return next(new Error('Trip not found'));
  }

  try {
    // TODO(Ola): gjøre så "groups" kan slette, ikke basert på brukerid for at admin kan også slette
    if (trip.userId !== userId) return res.status(403).json({ message: 'Unauthorized' });

    trip.set({
      name: name,
      start: start,
      goal: goal,
      date: date,
      difficulty: difficulty,
      type: type,
      duration: duration,
      description: description
    });

    await trip.save();

    return res.status(200).json({ message: 'Trip updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(new Error('Something went wrong'));
  }
};

module.exports = {
  getTrips,
  createTrip,
  getUserTrips,
  getTrip,
  signUp,
  signOff,
  deleteTrip,
  updateTrip
};
