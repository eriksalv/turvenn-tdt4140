const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const generateToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET || 'abc123';
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '1h'
  });
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['email', 'firstName', 'lastName'] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    return next(new Error('Something went wrong'));
  }
};

/**
 * @desc   Get current user
 * @route  /api/users/login
 * @access Private
 */
const getLogin = async (req, res, next) => {
  const user = {
    id: req.user.id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName
  };
  res.status(200).json(user);
};

const registerUser = async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  const errors = validationResult(req);

  // Validation
  if (!errors.isEmpty() || !firstName || !lastName || !email || !password) {
    res.status(400);
    return next(new Error('Validation failed for submitted data'));
  }

  // Check if user already exists
  if (await User.findOne({ where: { email } })) {
    res.status(400);
    return next(new Error('User already exists'));
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
        lastName: newUser.lastName,
        accessToken: generateToken(newUser.id)
      }
    });
  } catch (error) {
    // Database couldn't save user
    res.status(400);
    next(new Error('Invalid user data'));
  }
};

const loginUser = async (req, res, next) => {
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
        lastName: user.lastName,
        accessToken: generateToken(user.id)
      }
    });
  }
  res.status(401);
  next(new Error('Invalid credentials'));
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getLogin
};
