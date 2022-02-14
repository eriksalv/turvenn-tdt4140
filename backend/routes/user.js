const express = require('express');

const { registerUser, getUsers, loginUser } = require('../controllers/userController');

const router = express.Router();

// GET
router.get('/', getUsers);

// POST /feed/post
router.post('/', registerUser);

router.post('/login', loginUser);

module.exports = router;
