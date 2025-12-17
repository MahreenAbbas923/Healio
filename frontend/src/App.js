import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AwarenessHub from './pages/AwarenessHub';
import PatientDashboard from './pages/PatientDashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/awareness-hub" element={<AwarenessHub />} />
        <Route path="/patient-dashboard/*" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;