import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = ({ doctorId, onClose }) => {
  const [formData, setFormData] = useState({ date: '', time: '', concern: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/book-appointment', { ...formData, doctorId }).then(() => {
      alert('Appointment booked!');
      onClose();
    });
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <form onSubmit={handleSubmit}>
        <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-3 border rounded mb-4" />
        {/* Add other fields */}
        <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;