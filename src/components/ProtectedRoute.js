import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './UI/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (!user) {
    return <LoadingSpinner message="Verificando autenticação..." />;
  }

  return children;
};

export default ProtectedRoute;
