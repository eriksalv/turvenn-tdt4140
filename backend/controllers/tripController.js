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
    return res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

const createTrip = asyncHandler(async(req,res) =>{
    const {name, start, goal, date, difficulty, duration, description, userId} = req.body;
    try {
        const findUser = await User.findByPk(userId);

        const newTrip = await Trip.create({name, start, goal, date, difficulty, duration, description, userId:findUser.id});
        return res.status(201).json({
            message: 'Trip created successfully',
            trip:{
                name: newTrip.name,
                start: newTrip.start,
                goal: newTrip.goal,
                date: newTrip.date,
                difficulty: newTrip.difficulty,
                duration: newTrip.duration,
                description: newTrip.description
            }

        });
    }
    catch(error){
        res.status(400);
        throw new Error('Invalid trip data')
    }
})

module.exports = { getTrips, createTrip};
