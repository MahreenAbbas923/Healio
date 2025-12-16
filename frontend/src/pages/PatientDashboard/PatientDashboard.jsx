import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WellnessTracker from './WellnessTracker';
import Profile from './Profile';
import Doctors from './Doctors';
import Appointments from './Appointments';

const PatientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token'); // Clear JWT
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-64 bg-white shadow-lg transition-all ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="p-6 border-b">
          <h3 className="font-bold text-purple-600">Patient Portal</h3>
          <p className="text-sm text-gray-500">Healio</p>
        </div>
        <nav className="p-4 space-y-2">
          <button onClick={() => navigate('/dashboard')} className="w-full flex gap-3 px-4 py-3 rounded-lg hover:bg-pink-100 text-purple-600">
            <i className="fas fa-home"></i> Dashboard Home
          </button>
          <button onClick={() => navigate('profile')} className="w-full flex gap-3 px-4 py-3 rounded-lg hover:bg-pink-100 text-purple-600">
            <i className="fas fa-user"></i> Profile
          </button>
          <button onClick={() => navigate('doctors')} className="w-full flex gap-3 px-4 py-3 rounded-lg hover:bg-pink-100 text-purple-600">
            <i className="fas fa-stethoscope"></i> Doctors
          </button>
          <button onClick={() => navigate('appointments')} className="w-full flex gap-3 px-4 py-3 rounded-lg hover:bg-pink-100 text-purple-600">
            <i className="fas fa-calendar"></i> Appointments
          </button>
          <button onClick={logout} className="w-full flex gap-3 px-4 py-3 rounded-lg hover:bg-red-100 text-red-600">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
        {/* Top Header */}
        <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-lg mb-8">
          <h1 className="text-3xl font-bold">Welcome, John Doe</h1>
          <p class="text-lg italic">"Your mental health is a priority. Your happiness is essential."</p>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute top-4 left-4 md:hidden text-white">
            <i className="fas fa-arrow-right"></i>
          </button>
        </header>

        {/* Internal Routes */}
        <Routes>
          <Route path="/" element={<WellnessTracker />} />
          <Route path="profile" element={<Profile />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
        </Routes>
      </main>
    </div>
  );
};

export default PatientDashboard;