const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/authHandler');

const { getTrips, createTrip, getTrip, signUp } = require('../controllers/tripController');

const router = express.Router();

// GET /api/trips
router.get('/', getTrips);

// GET /api/trips/:tripId
router.get('/:tripId', getTrip);

// POST /api/trips
router.post('/', protect, createTrip);

router.post('/:tripId/signup', protect, signUp);

module.exports = router;
