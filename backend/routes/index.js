const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user'); // for counselors creating patients
const counselorRoutes = require('./counselor'); // admin manages counselors + counselor patients
const medicationRoutes = require('./medication');
const prescriptionRoutes = require('./prescription');

router.use('/auth', authRoutes);
router.use('/users', userRoutes); 
router.use('/counselors', counselorRoutes); 
router.use('/medications', medicationRoutes);
router.use('/prescriptions', prescriptionRoutes);

module.exports = router;
