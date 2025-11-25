const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { createCounselor, getCounselors } = require('../controllers/counselorController');

// Only admin can create or view counselors
router.use(authenticate, authorize(['admin']));

router.post('/counselors', createCounselor);
router.get('/counselors', getCounselors);

module.exports = router;
