import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Si está cargando, no muestra nada o un spinner
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si el usuario no está autenticado, redirige al login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, muestra los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;