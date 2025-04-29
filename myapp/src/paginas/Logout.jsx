import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    // Ejecutar logout cuando el componente se monta
    logout();
  }, [logout]);

  // Redirigir a la página de inicio después de cerrar sesión
  return <Navigate to="/" replace />;
};

export default Logout;
