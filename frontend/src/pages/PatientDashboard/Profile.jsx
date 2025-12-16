import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', dob: '', address: '', notes: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/user').then(res => setProfile(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/user', profile).then(() => setMessage('Profile updated!'));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-purple-600">My Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full p-3 border rounded mb-4" placeholder="Name" />
        {/* Add other fields like this */}
        <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded">Save</button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default Profile;