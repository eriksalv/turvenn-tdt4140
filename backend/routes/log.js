const express = require('express');
const multer = require('multer');

const router = express.Router({ mergeParams: true });

const { body } = require('express-validator');
const { createLog, getLogs } = require('../controllers/logController');

const { storage } = require('../server');
const { protect } = require('../middleware/authHandler');

const upload = multer({ storage: storage });

// const upload = multer({ dest: '/uploads' });

router.post('/', protect, upload.single('formData'), createLog);

router.get('/', getLogs);

module.exports = router;
