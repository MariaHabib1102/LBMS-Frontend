// src/api/api.js
import axios from 'axios';

axios.defaults.withCredentials = true;

// Function to get the CSRF token from the meta tag
const getCSRFToken = () => {
  const tokenElement = document.querySelector('meta[name="csrf-token"]');
  if (tokenElement) {
    return tokenElement.getAttribute('content');
  } else {
    console.error('CSRF token meta tag not found');
    return '';
  }
};

export const registerUser = (user) => {
  return axios.post('http://localhost:3000/auth/register', {
    user: {
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    }
  }, {
    headers: {
      'X-CSRF-Token': getCSRFToken()
    }
  });
};
