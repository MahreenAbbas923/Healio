import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const WellnessTracker = () => {
  const [wellnessData, setWellnessData] = useState({
    overall: 7.5, mental: 8.2, sleep: 6.8, stress: 7.1,
    weekly: [], moods: []
  });

  useEffect(() => {
    axios.get('/api/wellness').then(res => setWellnessData(res.data));
  }, []);

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { label: 'Mental Health', data: [6.5, 6.8, 7.5, 8.2], borderColor: '#FF69B4' },
      { label: 'Overall Wellness', data: [6.0, 6.5, 7.0, 7.5], borderColor: '#9370DB' }
    ]
  };

  const doughnutData = {
    labels: ['Happy', 'Calm', 'Neutral', 'Anxious'],
    datasets: [{ data: [35, 30, 20, 15], backgroundColor: ['#FF69B4', '#9370DB', '#FFD700', '#FF6B6B'] }]
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-purple-600">Wellness Tracker</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="text-4xl font-bold text-pink-500">{wellnessData.overall}/10</div>
          <p className="text-gray-700">Overall Wellness</p>
        </div>
        {/* Add other cards like this */}
      </div>
      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Line data={lineData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Doughnut data={doughnutData} />
        </div>
      </div>
      {/* Weekly Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full">
          {/* Add rows with data from wellnessData.weekly */}
        </table>
      </div>
    </div>
  );
};

export default WellnessTracker;