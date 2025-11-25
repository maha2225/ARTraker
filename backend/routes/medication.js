const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { getMedications } = require('../controllers/medicationController');

router.get('/', authenticate, authorize(['admin', 'counselor']), getMedications);

module.exports = router;
