const express = require('express');
const { body } = require('express-validator');

const { getTrips, createTrip } = require('../controllers/tripController');

const router = express.Router();

// GET /api/trips
router.get('/', getTrips);

// POST /api/trips
router.post('/', createTrip);

module.exports = router;
