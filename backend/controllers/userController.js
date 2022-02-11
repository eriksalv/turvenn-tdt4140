const asyncHandler = require('express-async-handler');

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({
    users: [{ email: 'test@test.com', firstName: 'John', lastName: 'Doe' }]
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, firstName, lastName } = req.body;
  // Create user in db
  res.status(201).json({
    message: 'User created successfully',
    user: { id: new Date().toISOString(), email, firstName, lastName }
  });
});

module.exports = {
  getUsers,
  registerUser
};
