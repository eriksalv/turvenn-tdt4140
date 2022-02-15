const asyncHandler = require('express-async-handler');
const { Trip, User } = require('../models');
const { validationResult } = require('express-validator');
const user = require('../models/user');

const getTrips = asyncHandler(async (req, res) => {
  try {
    const trips = await Trip.findAll({
      attributes: ['name', 'start', 'goal', 'date', 'difficulty', 'duration', 'description'],
      include: [{
          model: User,
          as: 'user',
          attributes: ['firstName','lastName','email']
      }]
    });
    res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = { getTrips };
