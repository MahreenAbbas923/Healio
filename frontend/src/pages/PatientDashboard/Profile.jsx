import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({ 
    firstName: 'Mahreen', 
    lastName: 'Abbas',
    email: '999mahreen@gmail.com', 
    phone: '+1 234 567 8900', 
    dob: '1995-05-15', 
    address: '123 Main Street, City', 
    emergencyContact: '+1 987 654 3210',
    medicalNotes: '' 
  });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setMessage('Profile updated successfully!');
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-purple-600">My Profile</h1>
      
      {message && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
          <i className="fas fa-check-circle mr-2"></i>{message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {profile.firstName[0]}{profile.lastName[0]}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{profile.firstName} {profile.lastName}</h2>
            <p className="text-gray-500">{profile.email}</p>
            <button type="button" className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium">
              <i className="fas fa-camera mr-1"></i> Change Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input 
              type="text" 
              name="firstName"
              value={profile.firstName} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              value={profile.lastName} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={profile.email} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input 
              type="tel" 
              name="phone"
              value={profile.phone} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input 
              type="date" 
              name="dob"
              value={profile.dob} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
            <input 
              type="tel" 
              name="emergencyContact"
              value={profile.emergencyContact} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input 
              type="text" 
              name="address"
              value={profile.address} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Medical Notes</label>
            <textarea 
              name="medicalNotes"
              value={profile.medicalNotes} 
              onChange={handleChange}
              placeholder="Any medical conditions, allergies, or notes for your healthcare providers..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none" 
            />
          </div>
        </div>
        
        <div className="mt-8 flex gap-4">
          <button 
            type="submit" 
            disabled={saving}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {saving ? (
              <><i className="fas fa-spinner fa-spin mr-2"></i>Saving...</>
            ) : (
              <><i className="fas fa-save mr-2"></i>Save Changes</>
            )}
          </button>
          <button 
            type="button" 
            className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;