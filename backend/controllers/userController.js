const asyncHandler = require('express-async-handler');
const { User } = require('../models');

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['email', 'firstName', 'lastName'] });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    // Create user in db, adding encryption to password later
    const newUser = await User.create({ email, firstName, lastName, password });
    res.status(201).json({
      message: 'User created successfully',
      user: {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = {
  getUsers,
  registerUser
};
