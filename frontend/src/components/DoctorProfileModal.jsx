import React, { useState } from 'react';
import AppointmentForm from './AppointmentForm';

const DoctorProfileModal = ({ doctor, onClose }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-lg w-full">
        <button onClick={onClose} className="float-right text-3xl">&times;</button>
        <img src={doctor.photo} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto" />
        <h2 className="text-2xl font-bold text-purple-600 text-center mt-4">{doctor.name}</h2>
        <p className="text-center text-pink-500">{doctor.specialty}</p>
        <p className="mt-4 text-gray-700">{doctor.bio}</p>
        <p>Rating: {doctor.rating} ⭐ ( {doctor.reviews} reviews)</p>
        <p>Experience: {doctor.experience} years</p>
        <button onClick={() => setShowForm(true)} className="w-full mt-6 p-3 bg-pink-500 text-white rounded">
          Book Appointment
        </button>
        {showForm && <AppointmentForm doctorId={doctor.id} onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
};

export default DoctorProfileModal;