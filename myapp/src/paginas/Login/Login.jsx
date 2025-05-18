import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Ruta corregida
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Verificar si existen usuarios registrados
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email);
      
      // Demo: también permitir el usuario de prueba
      if (email === 'usuario@ejemplo.com' && password === 'contraseña123') {
        await login({ username: 'Usuario Demo', email });
        navigate('/');
        return;
      }
      
      // Verificar si el usuario existe
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      
      // En una app real, verificaríamos la contraseña hasheada
      // Por simplicidad, solo verificamos que el usuario exista
      
      await login({ username: user.username, email: user.email });
      navigate('/');
    } catch (err) {
      setError('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
              <button 
                type="button" 
                className="toggle-password-btn"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="login-footer">
          <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
          <p><Link to="/">Olvidé mi contraseña</Link></p>
        </div>
        {/* Texto adicional para usuario y clave de prueba */}
        <div className="test-credentials">
          <p><strong>Usuario de prueba:</strong> usuario@ejemplo.com</p>
          <p><strong>Contraseña de prueba:</strong> contraseña123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;