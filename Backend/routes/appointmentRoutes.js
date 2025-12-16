const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getMyAppointments,
  getAppointment,
  updateAppointmentStatus,
  cancelAppointment
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/auth');

router.use(protect); // All routes require authentication

router.post('/', createAppointment);
router.get('/my-appointments', getMyAppointments);
router.get('/:id', getAppointment);
router.put('/:id/status', updateAppointmentStatus);
router.put('/:id/cancel', cancelAppointment);

module.exports = router;

