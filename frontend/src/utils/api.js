const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to set auth token
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

// Helper function to remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Helper function to get user from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Helper function to set user in localStorage
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // If it's a network error (fetch failed)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Failed to fetch');
    }
    // Re-throw other errors
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  getMe: async () => {
    return apiRequest('/auth/me');
  },
};

// User API calls
export const userAPI = {
  getProfile: async () => {
    return apiRequest('/users/profile');
  },
  updateProfile: async (userData) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Doctor API calls
export const doctorAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/doctors${queryString ? `?${queryString}` : ''}`);
  },
  getById: async (id) => {
    return apiRequest(`/doctors/${id}`);
  },
};

// Appointment API calls
export const appointmentAPI = {
  create: async (appointmentData) => {
    return apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },
  getMyAppointments: async (status) => {
    const query = status ? `?status=${status}` : '';
    return apiRequest(`/appointments/my-appointments${query}`);
  },
  getById: async (id) => {
    return apiRequest(`/appointments/${id}`);
  },
  updateStatus: async (id, status, notes) => {
    return apiRequest(`/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  },
  cancel: async (id) => {
    return apiRequest(`/appointments/${id}/cancel`, {
      method: 'PUT',
    });
  },
};