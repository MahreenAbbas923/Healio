const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, dateOfBirth, address, medicalNotes, profileImage } = req.body;
    
    const updateData = {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address,
      medicalNotes
    };

    // If profileImage is provided (base64), save it
    if (profileImage && profileImage.startsWith('data:image')) {
      const user = await User.findById(req.userId);
      
      // Delete old profile image if exists
      if (user.profileImage) {
        const oldImagePath = path.join(__dirname, '..', user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Extract base64 data
      const matches = profileImage.match(/^data:image\/(\w+);base64,(.+)$/);
      if (matches) {
        const extension = matches[1];
        const imageData = matches[2];
        const filename = `profile-${req.userId}-${Date.now()}.${extension}`;
        const uploadDir = path.join(__dirname, '..', 'uploads', 'profiles');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filepath = path.join(uploadDir, filename);
        fs.writeFileSync(filepath, imageData, 'base64');
        
        updateData.profileImage = `/uploads/profiles/${filename}`;
      }
    }
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

