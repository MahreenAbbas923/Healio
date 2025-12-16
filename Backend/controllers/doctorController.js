const Doctor = require('../models/Doctor');
const User = require('../models/User');

// Get All Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const { specialization, search } = req.query;
    
    let query = { isAvailable: true };
    
    if (specialization) {
      query.specialization = specialization;
    }

    let doctors = await Doctor.find(query)
      .populate('userId', 'firstName lastName email phone')
      .sort({ rating: -1, totalReviews: -1 });

    // Filter by search term if provided
    if (search) {
      doctors = doctors.filter(doctor => {
        const fullName = `${doctor.userId.firstName} ${doctor.userId.lastName}`.toLowerCase();
        return fullName.includes(search.toLowerCase()) || 
               doctor.specialization.toLowerCase().includes(search.toLowerCase());
      });
    }

    res.json({ success: true, count: doctors.length, doctors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Doctor
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'firstName lastName email phone');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Doctor Profile (for doctors registering)
exports.createDoctorProfile = async (req, res) => {
  try {
    const { specialization, licenseNumber, yearsOfExperience, bio, hourlyRate, availability } = req.body;

    // Check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({ userId: req.userId });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor profile already exists' });
    }

    const doctor = await Doctor.create({
      userId: req.userId,
      specialization,
      licenseNumber,
      yearsOfExperience,
      bio,
      hourlyRate,
      availability
    });

    res.status(201).json({ success: true, message: 'Doctor profile created successfully', doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

