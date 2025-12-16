import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/appointments').then(res => setAppointments(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-purple-600">Appointments</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* List appointments with buttons to join/reschedule/cancel */}
      </div>
    </div>
  );
};

export default Appointments;