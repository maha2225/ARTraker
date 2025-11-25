const express = require('express');
const router = express.Router();
const { 
  createCounselor, 
  getCounselors, 
  getCounselorById, 
  updateCounselor, 
  deleteCounselor, 
} = require('../controllers/counselorController');

const { authenticate, authorize } = require('../middleware/auth');

// -----------------------------
// Admin-only routes
// -----------------------------
router.post('/', authenticate, authorize(['admin']), createCounselor);
router.get('/', authenticate, authorize(['admin']), getCounselors);
router.get('/:id', authenticate, authorize(['admin']), getCounselorById);
router.put('/:id', authenticate, authorize(['admin']), updateCounselor);
router.delete('/:id', authenticate, authorize(['admin']), deleteCounselor);

// -----------------------------
// Counselor-only routes
// -----------------------------


module.exports = router;
