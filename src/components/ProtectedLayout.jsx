import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Sidebar from './Sidebar';
import Topbar from './Topbar.jsx';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Topbar />
        <Outlet />
      </div>
      {/* Overlay para fechar a sidebar no mobile */}
      <div
        className="sidebar-overlay"
        onClick={() => document.body.classList.remove('sidebar-open')}
        aria-hidden
      />
    </div>
  );
};

export default ProtectedLayout;
