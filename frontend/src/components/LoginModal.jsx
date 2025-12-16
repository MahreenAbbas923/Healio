import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, setAuthToken, setUser } from '../utils/api';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login(email.trim().toLowerCase(), password);

      if (response.success) {
        // Store token and user data
        setAuthToken(response.token);
        setUser(response.user);
        
        // Close modal and reset form
        onClose();
        setEmail('');
        setPassword('');
        setErrors({});
        
        // Redirect to dashboard
        navigate('/patient-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Provide more specific error messages
      if (error.message === 'Failed to fetch') {
        setErrorMessage('Cannot connect to server. Please make sure the backend server is running.');
      } else {
        setErrorMessage(error.message || 'Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errorMessage}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="loginEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.email ? 'border-red-500' : ''}`}
                required
                disabled={loading}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.password ? 'border-red-500' : ''}`}
                required
                disabled={loading}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2 rounded" disabled={loading} />
                <span className="text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-purple-600 text-sm hover:underline">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 text-center text-gray-700">
            <p>Don't have an account? <button onClick={onSwitchToRegister} className="text-purple-600 hover:underline font-medium" disabled={loading}>Register here</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
