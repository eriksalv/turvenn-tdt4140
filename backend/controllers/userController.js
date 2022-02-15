const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { validationResult } = require('express-validator');

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

  const errors = validationResult(req);

  // Validation
  if (!errors.isEmpty() || !firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('Validation failed for submitted data');
  }

  // Check if user already exists
  if (await User.findOne({ where: { email } })) {
    res.status(400);
    throw new Error('User already exists');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, firstName, lastName, password: hashedPassword });
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      },
      token: 'some token'
    });
  } catch (error) {
    // Database couldn't save user
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  // Match passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      message: 'User login successfull',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token: 'some token'
    });
  }
  res.status(401);
  throw new Error('Invalid credentials');
});

module.exports = {
  getUsers,
  registerUser,
  loginUser
};
