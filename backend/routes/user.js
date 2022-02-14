const express = require('express');

const { registerUser, getUsers } = require('../controllers/userController');

const router = express.Router();

// GET
router.get('/', getUsers);

// POST /feed/post
router.post('/', registerUser);

module.exports = router;
