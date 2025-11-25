const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const {
  createPrescription,
  getPrescriptions,
  getPrescriptionById
} = require('../controllers/prescriptionController');

// Admin & Counselor routes
router.post('/', authenticate, authorize(['admin', 'counselor']), createPrescription);
router.get('/', authenticate, authorize(['admin', 'counselor']), getPrescriptions);
router.get('/:id', authenticate, authorize(['admin', 'counselor']), getPrescriptionById);
// router.put('/:id', authenticate, authorize(['admin', 'counselor']), updatePrescription);
// router.delete('/:id', authenticate, authorize(['admin', 'counselor']), deletePrescription);

module.exports = router;
