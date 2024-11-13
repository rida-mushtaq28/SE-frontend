// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Check if token exists

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
