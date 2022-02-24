const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/authHandler');

const {
  getTrips,
  createTrip,
  getTrip,
  signUp,
  signOff,
  getParticipators
} = require('../controllers/tripController');

const router = express.Router();

// GET /api/trips
router.get('/', getTrips);

// GET /api/trips/:tripId
router.get('/:tripId', getTrip);

// POST /api/trips
router.post('/', protect, createTrip);

// POST /api/trips/:tripId/signup
router.post('/:tripId/signup', protect, signUp);

// DELETE /api/trips/:tripId/signup
router.delete('/:tripId/signup', protect, signOff);

// GET /api/trips/:tripId/participators
router.get('/:tripId/participators', getParticipators);

module.exports = router;
