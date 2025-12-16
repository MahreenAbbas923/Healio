const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctor, createDoctorProfile } = require('../controllers/doctorController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllDoctors);
router.get('/:id', getDoctor);

// Protected routes
router.post('/profile', protect, createDoctorProfile);

module.exports = router;

