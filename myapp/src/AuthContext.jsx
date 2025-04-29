import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Comprobar si hay un token guardado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // En una aplicación real, aquí verificaríamos el token con el backend
      setCurrentUser({ id: 1, username: 'usuario', email: 'usuario@ejemplo.com' });
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulamos una llamada a la API
      setTimeout(() => {
        if (email === 'usuario@ejemplo.com' && password === 'contraseña') {
          const user = { id: 1, username: 'usuario', email };
          const token = 'fake-jwt-token';
          
          // Guardar token en localStorage
          localStorage.setItem('authToken', token);
          
          // Actualizar estado
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 500);
    });
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

  // Función para comprobar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!currentUser;
  };

  // Valor del contexto
  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
