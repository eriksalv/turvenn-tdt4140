const express = require('express');

const router = express.Router({ mergeParams: true });

const { body } = require('express-validator');
const { createLog, getLogs } = require('../controllers/logController');
const { uploadSingle } = require('../middleware/uploadHandler');

const { protect } = require('../middleware/authHandler');

router.post('/', protect, createLog);

router.get('/', getLogs);

module.exports = router;
