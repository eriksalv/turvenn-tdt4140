const express = require('express');
const { body } = require('express-validator');

const { getTrips } = require('../controllers/tripController');

const router = express.Router();

// GET /api/trips
router.get('/', getTrips);

module.exports = router;
