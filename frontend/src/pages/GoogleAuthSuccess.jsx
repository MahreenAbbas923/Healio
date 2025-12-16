import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, setUser } from '../utils/api';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userStr = urlParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        
        // Store token and user data
        setAuthToken(token);
        setUser(user);

        // Redirect to dashboard
        navigate('/patient-dashboard');
      } catch (error) {
        console.error('Error parsing Google auth data:', error);
        navigate('/?error=auth_failed');
      }
    } else {
      navigate('/?error=auth_failed');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-xl text-gray-700">Signing you in...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
