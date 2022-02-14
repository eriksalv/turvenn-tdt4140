const express = require('express');
const { body } = require('express-validator');

const { registerUser, getUsers, loginUser } = require('../controllers/userController');

const router = express.Router();

// GET /api/users
router.get('/', getUsers);

// POST /api/users
router.post('/', [body('email').isEmail(), body('password').isLength({ min: 4 })], registerUser);

// POST /api/users/login
router.post('/login', loginUser);

module.exports = router;
