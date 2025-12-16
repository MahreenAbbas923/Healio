const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctor, appointmentDate, appointmentTime, duration, sessionType, concern, additionalInfo } = req.body;

    // Check if doctor exists
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointment = await Appointment.create({
      patient: req.userId,
      doctor,
      appointmentDate,
      appointmentTime,
      duration: duration || 60,
      sessionType,
      concern,
      additionalInfo,
      status: 'pending'
    });

    res.status(201).json({ success: true, message: 'Appointment requested successfully', appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Patient Appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = { patient: req.userId };
    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('doctor', 'specialization hourlyRate')
      .populate({
        path: 'doctor',
        populate: { path: 'userId', select: 'firstName lastName email phone' }
      })
      .sort({ appointmentDate: -1 });

    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Appointment
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'specialization hourlyRate')
      .populate({
        path: 'doctor',
        populate: { path: 'userId', select: 'firstName lastName email phone' }
      })
      .populate('patient', 'firstName lastName email');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user owns this appointment
    if (appointment.patient._id.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this appointment' });
    }

    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Appointment Status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ success: true, message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ success: true, message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

