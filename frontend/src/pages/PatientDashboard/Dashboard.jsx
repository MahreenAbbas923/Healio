import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Doctors from './Doctors';
import Appointments from './Appointments';

const PatientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('home');
  const [reflection, setReflection] = useState('');
  const [mood, setMood] = useState(null);
  const [savedReflections, setSavedReflections] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token'); // Clear JWT
    navigate('/');
  };

  // Mock data - replace with actual API calls
  const stats = {
    totalAppointments: 12,
    upcomingAppointments: 2
  };

  const monthlyData = [
    { month: 'Jan', count: 4 },
    { month: 'Feb', count: 6 },
    { month: 'Mar', count: 3 },
    { month: 'Apr', count: 8 },
    { month: 'May', count: 5 },
    { month: 'Jun', count: 7 }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Clinical Psychologist',
      date: '2025-12-18',
      time: '10:00 AM',
      type: 'Video Call'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Psychiatrist',
      date: '2025-12-20',
      time: '2:30 PM',
      type: 'In Person'
    }
  ];

  const moods = [
    { emoji: '😊', label: 'Great', value: 'great' },
    { emoji: '🙂', label: 'Good', value: 'good' },
    { emoji: '😐', label: 'Okay', value: 'okay' },
    { emoji: '😔', label: 'Low', value: 'low' },
    { emoji: '😢', label: 'Struggling', value: 'struggling' }
  ];

  const maxCount = Math.max(...monthlyData.map(d => d.count));

  const addReflection = () => {
    if (reflection.trim()) {
      const newReflection = {
        id: Date.now(),
        text: reflection,
        mood: mood,
        date: new Date().toLocaleDateString()
      };
      setSavedReflections([newReflection, ...savedReflections.slice(0, 2)]);
      setReflection('');
      setMood(null);
    }
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
          <button onClick={() => navigate('/patient-dashboard')} className="w-full flex gap-3 px-4 py-3 rounded-lg hover:bg-pink-100 text-purple-600">
            <i className="fas fa-home"></i> Dashboard Home
          </button>
          <button onClick={() => navigate('/patient-dashboard/profile')} className="w-full flex gap-3 px-4 py-3 rounded-lg hover:bg-pink-100 text-purple-600">
            <i className="fas fa-user"></i> Profile
          </button>
          <button onClick={() => navigate('/patient-dashboard/doctors')} className="w-full flex gap-3 px-4 py-3 rounded-lg hover:bg-pink-100 text-purple-600">
            <i className="fas fa-stethoscope"></i> Doctors
          </button>
          <button onClick={() => navigate('/patient-dashboard/appointments')} className="w-full flex gap-3 px-4 py-3 rounded-lg hover:bg-pink-100 text-purple-600">
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
        <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-lg mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome, Mahreen Abbas</h1>
          <p className="text-lg italic">"Your mental health is a priority. Your happiness is essential."</p>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute top-4 left-4 md:hidden text-white">
            <i className="fas fa-arrow-right"></i>
          </button>
        </header>

        {/* Internal Routes */}
        <Routes>
          <Route path="/" element={
            <div className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Appointments Card */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-2">Total Appointments</p>
                      <p className="text-4xl font-bold text-purple-600">{stats.totalAppointments}</p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-full">
                      <i className="fas fa-calendar-check text-3xl text-purple-600"></i>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-600 text-sm">
                    <i className="fas fa-arrow-up mr-1"></i>
                    <span>12% from last month</span>
                  </div>
                </div>

                {/* Upcoming Appointments Card */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-2">Upcoming Appointments</p>
                      <p className="text-4xl font-bold text-pink-500">{stats.upcomingAppointments}</p>
                    </div>
                    <div className="bg-pink-100 p-4 rounded-full">
                      <i className="fas fa-clock text-3xl text-pink-500"></i>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-blue-600 text-sm">
                    <i className="fas fa-info-circle mr-1"></i>
                    <span>Next one in 2 days</span>
                  </div>
                </div>
              </div>

              {/* Content Row: Chart + Upcoming List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Yearly Appointments Chart */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Yearly Appointments</h3>
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>2025</option>
                      <option>2024</option>
                    </select>
                  </div>
                  
                  {/* Bar Chart */}
                  <div className="flex items-end justify-between h-64 gap-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '200px' }}>
                          <div 
                            className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg transition-all hover:from-purple-600 hover:to-purple-400 cursor-pointer flex items-end justify-center pb-2"
                            style={{ height: `${(data.count / maxCount) * 100}%` }}
                          >
                            <span className="text-white font-semibold text-sm">{data.count}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 font-medium">{data.month}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Appointments List */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
                    <span className="bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 rounded-full">
                      {upcomingAppointments.length}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">{appointment.doctor}</h4>
                            <p className="text-sm text-gray-500 mb-3">{appointment.specialty}</p>
                            
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <i className="fas fa-calendar text-purple-500 w-5"></i>
                                <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <i className="fas fa-clock text-purple-500 w-5"></i>
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                          
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.type === 'Video Call' 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-green-100 text-green-600'
                          }`}>
                            <i className={`fas ${appointment.type === 'Video Call' ? 'fa-video' : 'fa-hospital'} mr-1`}></i>
                            {appointment.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-colors">
                    View All Appointments →
                  </button>
                </div>
              </div>

              {/* Daily Reflection Section */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <i className="fas fa-book text-purple-600 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Daily Reflection</h3>
                </div>
                
                <p className="text-gray-600 mb-4">How are you feeling today?</p>
                
                {/* Mood Selector */}
                <div className="flex gap-3 mb-4 flex-wrap">
                  {moods.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setMood(m.value)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        mood === m.value 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <span className="text-2xl mb-1">{m.emoji}</span>
                      <span className="text-xs text-gray-600">{m.label}</span>
                    </button>
                  ))}
                </div>

                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Take a moment to reflect on your thoughts and feelings..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={addReflection}
                    disabled={!reflection.trim() || !mood}
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-plus"></i>
                    Add Note
                  </button>
                  
                  <button 
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <i className="fas fa-history"></i>
                    View History
                  </button>
                </div>

                {/* Recent Reflections */}
                {savedReflections.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Reflections</h4>
                    <div className="space-y-3">
                      {savedReflections.map((ref) => (
                        <div key={ref.id} className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{moods.find(m => m.value === ref.mood)?.emoji}</span>
                            <span className="text-xs text-gray-500">{ref.date}</span>
                          </div>
                          <p className="text-sm text-gray-700">{ref.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => navigate('doctors')} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow">
                  <i className="fas fa-stethoscope text-3xl mb-3"></i>
                  <h4 className="font-semibold mb-1">Find a Doctor</h4>
                  <p className="text-sm text-purple-100">Browse our network of specialists</p>
                </div>

                <div onClick={() => navigate('appointments')} className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow">
                  <i className="fas fa-calendar-plus text-3xl mb-3"></i>
                  <h4 className="font-semibold mb-1">Book Appointment</h4>
                  <p className="text-sm text-pink-100">Schedule your next session</p>
                </div>
              </div>

              {/* Mental Health Tips */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-md p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white p-2 rounded-lg">
                    <i className="fas fa-lightbulb text-yellow-500 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Today's Wellness Tip</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Remember to take breaks throughout your day. Even a 5-minute pause to breathe deeply and stretch can significantly reduce stress and improve your focus."
                </p>
                <button className="mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm">
                  Read More Tips →
                </button>
              </div>
            </div>
          } />
          <Route path="profile" element={<Profile />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
        </Routes>
      </main>
    </div>
  );
};

export default PatientDashboard;