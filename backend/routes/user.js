const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
const {createPatientAdherence, getPatientAdherence}  = require('../controllers/adherenceController');
const { route } = require('./auth');

// Routes
router.post('/', authenticate, authorize(['counselor']), createUser);
router.get('/', authenticate, authorize(['counselor', 'admin']), getUsers);
router.get('/:id', authenticate, authorize(['counselor', 'admin']), getUserById);

router.post("/:id/adherence", createPatientAdherence);
router.get("/:id/adherence", getPatientAdherence);

module.exports = router;
