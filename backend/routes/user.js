const express = require('express');
const { body } = require('express-validator');

const { registerUser, getUsers, loginUser, getLogin } = require('../controllers/userController');
const { protect } = require('../middleware/authHandler');

const router = express.Router();

const { getUserTrips } = require('../controllers/tripController');

// Bruker funksjon fra tripController, kanskje det finnes en bedre måte å gjøre dette på?
router.get('/:userId/trips', getUserTrips);

// GET /api/users
router.get('/', getUsers);

// GET /api/users/login
router.get('/login', protect, getLogin);

// POST /api/users
router.post('/', [body('email').isEmail(), body('password').isLength({ min: 4 })], registerUser);

// POST /api/users/login
router.post('/login', loginUser);

module.exports = router;
