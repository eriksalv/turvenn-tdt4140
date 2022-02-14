const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, firstName, lastName, password: hashedPassword });
    res.status(201).json({
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
    console.log(error);
    res.status(400).json(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

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
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
});

module.exports = {
  getUsers,
  registerUser,
  loginUser
};
