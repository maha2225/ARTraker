const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// POST /auth/login
// Login for both patients and counselors/admin
router.post('/login', login);

module.exports = router;
