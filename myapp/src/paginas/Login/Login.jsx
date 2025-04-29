import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Todos los campos son requeridos');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Call login from AuthContext
      await login(email, password);
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (err) {
      setError('Email o contraseña incorrectos');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
          <p><Link to="/">Olvidé mi contraseña</Link></p>
          
          <div className="test-credentials">
            <p>Credenciales de prueba:</p>
            <p>Email: usuario@ejemplo.com</p>
            <p>Contraseña: contraseña</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;