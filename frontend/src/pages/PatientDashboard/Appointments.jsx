import React, { useState, useEffect } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Clinical Psychologist',
      date: '2025-12-18',
      time: '10:00 AM',
      type: 'Video Call',
      status: 'Upcoming'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Psychiatrist',
      date: '2025-12-20',
      time: '2:30 PM',
      type: 'In Person',
      status: 'Upcoming'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Family Therapist',
      date: '2025-12-10',
      time: '11:00 AM',
      type: 'Video Call',
      status: 'Completed'
    }
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-purple-600">My Appointments</h1>
      
      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          {appointments.filter(a => a.status === 'Upcoming').map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{appointment.doctor}</h3>
                  <p className="text-gray-500">{appointment.specialty}</p>
                  
                  <div className="flex gap-6 mt-4">
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-calendar text-purple-500 mr-2"></i>
                      <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-clock text-purple-500 mr-2"></i>
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    appointment.type === 'Video Call' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    <i className={`fas ${appointment.type === 'Video Call' ? 'fa-video' : 'fa-hospital'} mr-2`}></i>
                    {appointment.type}
                  </span>
                  
                  <div className="flex gap-2">
                    {appointment.type === 'Video Call' && (
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        <i className="fas fa-video mr-2"></i>Join Call
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Appointments */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Appointments</h2>
        <div className="space-y-4">
          {appointments.filter(a => a.status === 'Completed').map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-md p-6 opacity-75">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{appointment.doctor}</h3>
                  <p className="text-gray-500">{appointment.specialty}</p>
                  
                  <div className="flex gap-6 mt-4">
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-calendar text-purple-500 mr-2"></i>
                      <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-clock text-purple-500 mr-2"></i>
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
                
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  <i className="fas fa-check mr-2"></i>Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;