const { Trip, User } = require('../models');

const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: ['name', 'start', 'goal', 'date', 'difficulty', 'duration', 'description'],
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
    res.status(500);
    next(new Error('Something went wrong'));
  }
};

const createTrip = async (req, res, next) => {
  const { name, start, goal, date, difficulty, duration, description, userId } = req.body;
  try {
    const findUser = await User.findByPk(userId);

    const newTrip = await Trip.create({
      name,
      start,
      goal,
      date,
      difficulty,
      duration,
      description,
      userId: findUser.id
    });
    return res.status(201).json({
      message: 'Trip created successfully',
      trip: {
        name: newTrip.name,
        start: newTrip.start,
        goal: newTrip.goal,
        date: newTrip.date,
        difficulty: newTrip.difficulty,
        duration: newTrip.duration,
        description: newTrip.description
      }
    });
  } catch (error) {
    res.status(400);
    next(new Error('Invalid trip data'));
  }
};

module.exports = { getTrips, createTrip };
