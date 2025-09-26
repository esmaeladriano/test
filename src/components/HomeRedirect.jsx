import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Dashboard from '../pages/Dashboard.jsx';

const HomeRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'aluno') {
    return <Navigate to="/student" replace />;
  }
  return <Dashboard />;
};

export default HomeRedirect;
