import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { getUser, removeAuthToken, authAPI, userAPI, setUser } from '../utils/api';

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    medicalNotes: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = React.useRef(null);
  const navigate = useNavigate();

  const openLogin = () => setIsLoginOpen(true);
  const openRegister = () => setIsRegisterOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First check localStorage
        const localUser = getUser();
        if (localUser) {
          setUserData(localUser);
          setProfileData({
            firstName: localUser.firstName || '',
            lastName: localUser.lastName || '',
            phone: localUser.phone || '',
            dateOfBirth: localUser.dateOfBirth ? new Date(localUser.dateOfBirth).toISOString().split('T')[0] : '',
            address: localUser.address || '',
            medicalNotes: localUser.medicalNotes || ''
          });
          
          // Load profile image if exists
          if (localUser.profileImage) {
            setProfileImage(`http://localhost:5000${localUser.profileImage}`);
          }
          
          setLoading(false);
          // Optionally refresh from API
          try {
            const response = await authAPI.getMe();
            if (response.success) {
              setUserData(response.user);
              setProfileData({
                firstName: response.user.firstName || '',
                lastName: response.user.lastName || '',
                phone: response.user.phone || '',
                dateOfBirth: response.user.dateOfBirth ? new Date(response.user.dateOfBirth).toISOString().split('T')[0] : '',
                address: response.user.address || '',
                medicalNotes: response.user.medicalNotes || ''
              });
              
              // Update profile image from server
              if (response.user.profileImage) {
                setProfileImage(`http://localhost:5000${response.user.profileImage}`);
              }
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          // No user found, redirect to home
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
        removeAuthToken();
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setSaving(true);

    try {
      const dataToSend = { ...profileData };
      
      // Include profile image only if it's a new base64 image (not a server URL)
      if (profileImage && profileImage.startsWith('data:image')) {
        dataToSend.profileImage = profileImage;
      }

      console.log('Saving profile data:', { ...dataToSend, profileImage: dataToSend.profileImage ? 'base64 data...' : 'none' });

      const response = await userAPI.updateProfile(dataToSend);
      if (response.success) {
        setUserData(response.user);
        setUser(response.user);
        
        // Update profile image with server URL if available
        if (response.user.profileImage) {
          const imageUrl = `http://localhost:5000${response.user.profileImage}`;
          setProfileImage(imageUrl);
        }
        
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Error details:', error.stack);
      if (error.message === 'Failed to fetch') {
        setErrorMessage('Cannot connect to server. Please make sure the backend server is running.');
      } else {
        setErrorMessage(error.message || 'Failed to update profile. Please try again.');
      }
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select only image files (JPG, PNG, GIF, etc.)');
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image size should be less than 5MB');
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setSuccessMessage('Profile picture updated! Don\'t forget to save changes.');
        setTimeout(() => setSuccessMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-purple-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const sections = {
    profile: 'Profile',
    doctors: 'Doctors',
    appointments: 'Appointments',
    wellness: 'Wellness',
    consultation: 'Consultation',
  };

  const motivationalQuotes = [
    "Your mental health is a priority. Your happiness is essential.",
    "Healing is not linear, and that's okay. Every step forward counts.",
    "You are stronger than you know. Take it one day at a time.",
    "It's okay to not be okay. What matters is that you're taking steps to feel better.",
    "Self-care isn't selfish. It's necessary for your wellbeing.",
  ];

  const renderContent = () => {
    if (!activeSection) {
      // Default welcome screen
      return (
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-12 rounded-2xl shadow-xl text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Welcome, {user.firstName} {user.lastName}</h1>
            <p className="text-xl italic">{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl text-purple-600 mb-4"><i className="fas fa-user-circle"></i></div>
              <h3 className="text-xl font-bold mb-2">My Profile</h3>
              <p className="text-gray-600 mb-4">Manage your personal information and medical notes</p>
              <button
                onClick={() => setActiveSection('profile')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                View Profile
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl text-purple-600 mb-4"><i className="fas fa-stethoscope"></i></div>
              <h3 className="text-xl font-bold mb-2">Find Doctors</h3>
              <p className="text-gray-600 mb-4">Browse our directory of mental health professionals</p>
              <button
                onClick={() => setActiveSection('doctors')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Browse Doctors
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl text-purple-600 mb-4"><i className="fas fa-calendar-alt"></i></div>
              <h3 className="text-xl font-bold mb-2">Appointments</h3>
              <p className="text-gray-600 mb-4">View and manage your upcoming sessions</p>
              <button
                onClick={() => setActiveSection('appointments')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                View Appointments
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl text-purple-600 mb-4"><i className="fas fa-chart-line"></i></div>
              <h3 className="text-xl font-bold mb-2">Wellness Tracker</h3>
              <p className="text-gray-600 mb-4">Monitor your mental wellness progress</p>
              <button
                onClick={() => setActiveSection('wellness')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                View Tracker
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl text-purple-600 mb-4"><i className="fas fa-clipboard-list"></i></div>
              <h3 className="text-xl font-bold mb-2">Book Consultation</h3>
              <p className="text-gray-600 mb-4">Request a new appointment with a doctor</p>
              <button
                onClick={() => setActiveSection('consultation')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                <p className="text-gray-600">Upcoming Appointments</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                <p className="text-gray-600">Completed Sessions</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">7.5/10</div>
                <p className="text-gray-600">Wellness Score</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                <p className="text-gray-600">Active Doctors</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Profile Section
    if (activeSection === 'profile') {
      return (
        <div className="max-w-6xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold mb-8 text-purple-600">My Profile</h1>
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSaveProfile}>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white mb-4 text-5xl overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <i className="fas fa-user"></i>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button 
                    type="button"
                    onClick={handlePhotoChange}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    disabled={saving}
                  >
                    Change Photo
                  </button>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={profileData.firstName} 
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                        required
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={profileData.lastName} 
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                        required
                        disabled={saving}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={profileData.phone} 
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                        placeholder="Enter phone number"
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
                      <input 
                        type="date" 
                        name="dateOfBirth"
                        value={profileData.dateOfBirth} 
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                        disabled={saving}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={profileData.address} 
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                      placeholder="Enter your address"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Medical Notes</label>
                    <textarea 
                      name="medicalNotes"
                      value={profileData.medicalNotes} 
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                      rows="4" 
                      placeholder="Any relevant medical information or notes about your mental health..."
                      disabled={saving}
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-900 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }

    // Doctors Section
    if (activeSection === 'doctors') {
      const doctors = [
        { name: 'Dr. Sarah Johnson', specialty: 'Psychiatrist', rating: 5, reviews: 124, price: 80, available: 'Mon-Fri', description: 'Specializing in anxiety disorders and depression. 15+ years of experience.' },
        { name: 'Dr. Michael Chen', specialty: 'Psychologist', rating: 4, reviews: 89, price: 75, available: 'Tue-Sat', description: 'Expert in cognitive behavioral therapy and trauma processing. 12+ years of experience.' },
        { name: 'Dr. Emily Rodriguez', specialty: 'Therapist', rating: 5, reviews: 156, price: 70, available: 'Daily', description: 'Specializing in relationship counseling and family therapy. 10+ years of experience.' },
        { name: 'Dr. James Wilson', specialty: 'Psychiatrist', rating: 5, reviews: 203, price: 90, available: 'Mon-Thu', description: 'Specializing in stress management and mindfulness techniques. 18+ years of experience.' },
      ];

      return (
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold mb-8 text-purple-600">Find Doctors</h1>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="text" placeholder="Search by name..." className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                <option>All Specializations</option>
                <option>Psychiatrist</option>
                <option>Psychologist</option>
                <option>Therapist</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                <option>All Ratings</option>
                <option>5 Stars</option>
                <option>4+ Stars</option>
              </select>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Filter</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-40 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-5xl text-white">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-sm font-medium mb-2 text-purple-600">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={j < doctor.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        <i className="fas fa-star"></i>
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({doctor.reviews} reviews)</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">{doctor.description}</p>
                  <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <p><i className="fas fa-calendar-alt mr-2"></i>Available: {doctor.available}</p>
                    <p><i className="fas fa-dollar-sign mr-2"></i>${doctor.price} per session</p>
                  </div>
                  <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Appointments Section
    if (activeSection === 'appointments') {
      return (
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold mb-8 text-purple-600">My Appointments</h1>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Upcoming Appointments</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-600 p-4 rounded-lg bg-purple-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">Session with Dr. Sarah Johnson</h3>
                    <p className="text-gray-600">Psychiatrist | Anxiety & Depression Management</p>
                    <div className="mt-3 space-y-2 text-sm text-gray-700">
                      <p><i className="fas fa-calendar-alt mr-2"></i>December 15, 2025</p>
                      <p><i className="fas fa-clock mr-2"></i>2:00 PM - 3:00 PM</p>
                      <p><i className="fas fa-map-marker-alt mr-2"></i>Virtual Session (Video Call)</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Join</button>
                    <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">Reschedule</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Wellness Tracker Section
    if (activeSection === 'wellness') {
      return (
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold mb-8 text-purple-600">Wellness Tracker</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2 text-purple-600">7.5/10</div>
              <p className="text-gray-600 font-medium">Overall Wellness</p>
              <p className="text-sm text-gray-500 mt-2">↑ 0.5 from last week</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2 text-purple-600">8.2/10</div>
              <p className="text-gray-600 font-medium">Mental Health</p>
              <p className="text-sm text-gray-500 mt-2">↑ 1.2 from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2 text-purple-600">6.8/10</div>
              <p className="text-gray-600 font-medium">Sleep Quality</p>
              <p className="text-sm text-gray-500 mt-2">↓ 0.3 from last week</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2 text-purple-600">7.1/10</div>
              <p className="text-gray-600 font-medium">Stress Level</p>
              <p className="text-sm text-gray-500 mt-2">↓ 0.8 from last week</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Progress</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>Chart visualization would go here</p>
            </div>
          </div>
        </div>
      );
    }

    // Consultation Section
    if (activeSection === 'consultation') {
      return (
        <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold mb-8 text-purple-600">Book a Consultation</h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Select a Doctor</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-purple-600 p-4 rounded-lg cursor-pointer transition hover:shadow-lg">
                    <input type="radio" name="doctor" value="dr-sarah" className="mr-2" />
                    <label className="font-semibold">Dr. Sarah Johnson</label>
                    <p className="text-sm text-gray-600">Psychiatrist - $80/session</p>
                  </div>
                  <div className="border-2 border-purple-600 p-4 rounded-lg cursor-pointer transition hover:shadow-lg">
                    <input type="radio" name="doctor" value="dr-michael" className="mr-2" />
                    <label className="font-semibold">Dr. Michael Chen</label>
                    <p className="text-sm text-gray-600">Psychologist - $75/session</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Session Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center border-2 border-purple-600 p-4 rounded-lg cursor-pointer">
                    <input type="radio" name="session-type" value="video" className="mr-3" defaultChecked />
                    <span>Video Call</span>
                  </label>
                  <label className="flex items-center border-2 border-purple-600 p-4 rounded-lg cursor-pointer">
                    <input type="radio" name="session-type" value="phone" className="mr-3" />
                    <span>Phone Call</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Date & Time</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                  <input type="time" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Chief Concern/Reason for Visit</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                  <option>Select a concern...</option>
                  <option>Anxiety</option>
                  <option>Depression</option>
                  <option>Stress Management</option>
                  <option>Relationship Issues</option>
                  <option>Sleep Problems</option>
                  <option>Trauma Processing</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Additional Information</label>
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" rows="6" placeholder="Describe your concerns..."></textarea>
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="terms" className="mr-3 mt-1" />
                <label htmlFor="terms" className="text-sm text-gray-700">I agree to the terms and conditions</label>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-900 transition">
                  Request Consultation
                </button>
                <button type="reset" className="flex-1 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition">
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Patient Portal</h3>
                <p className="text-xs text-gray-500">Healio</p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveSection(null)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                !activeSection
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-purple-100'
              }`}
            >
              <i className="fas fa-home text-lg"></i>
              <span className="font-medium">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveSection('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'profile'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-purple-100'
              }`}
            >
              <i className="fas fa-user-circle text-lg"></i>
              <span className="font-medium">My Profile</span>
            </button>
            <button
              onClick={() => setActiveSection('doctors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'doctors'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-purple-100'
              }`}
            >
              <i className="fas fa-stethoscope text-lg"></i>
              <span className="font-medium">Find Doctors</span>
            </button>
            <button
              onClick={() => setActiveSection('appointments')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'appointments'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-purple-100'
              }`}
            >
              <i className="fas fa-calendar-alt text-lg"></i>
              <span className="font-medium">Appointments</span>
            </button>
            <button
              onClick={() => setActiveSection('wellness')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'wellness'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-purple-100'
              }`}
            >
              <i className="fas fa-chart-line text-lg"></i>
              <span className="font-medium">Wellness Tracker</span>
            </button>
            <button
              onClick={() => setActiveSection('consultation')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === 'consultation'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-purple-100'
              }`}
            >
              <i className="fas fa-clipboard-list text-lg"></i>
              <span className="font-medium">Book Consultation</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200 mt-4">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all">
              <i className="fas fa-sign-out-alt text-lg"></i>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>
      </div>
      <Footer />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onSwitchToRegister={openRegister} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} onSwitchToLogin={openLogin} />
    </>
  );
};

export default PatientDashboard;

