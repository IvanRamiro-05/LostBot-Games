import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const isAuthenticated = () => !!currentUser;

  // Función para iniciar sesión
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  // Función para registrar un nuevo usuario
  const register = (userData) => {
    // En una aplicación real, aquí se haría una llamada a una API
    // Por ahora, simplemente simularemos el registro almacenando los usuarios en localStorage
    
    // Obtener usuarios existentes o inicializar un array vacío
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar si el email ya está registrado
    if (users.some(user => user.email === userData.email)) {
      throw new Error('El email ya está registrado');
    }
    
    // Agregar el nuevo usuario (sin guardar la contraseña en texto plano en una app real)
    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      // En una aplicación real, la contraseña debería estar hasheada
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return newUser;
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    isAuthenticated,
    login,
    logout,
    register,  // Añadir la función register al contexto
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
