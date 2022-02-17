const express = require('express');
const { body } = require('express-validator');

const { registerUser, getUsers, loginUser, getLogin } = require('../controllers/userController');
const { protect } = require('../middleware/authHandler');

const router = express.Router();

// GET /api/users
router.get('/', getUsers);

// GET /api/users/login
router.get('/login', protect, getLogin);

// POST /api/users
router.post('/', [body('email').isEmail(), body('password').isLength({ min: 4 })], registerUser);

// POST /api/users/login
router.post('/login', loginUser);

module.exports = router;
