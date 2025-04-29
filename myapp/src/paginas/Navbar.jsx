import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Login/AuthContext';
import './Navbar.css';
import logo from './imagenes/logo-03.png';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMenuActive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <img src={logo} className="logo" alt="Lostbot Games" />
          </Link>
          <div className="search-container">
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Buscar..." 
            />
          </div>
        </div>

        <div className="menu-toggle" id="menuToggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <div className={`navbar-main ${menuActive ? 'active' : ''}`}>
          <ul className="nav-links">
            <li className="nav-item dropdown">
              <a href="#" className="nav-link">TIENDA</a>
              <div className="dropdown-content">
                <a href="#" onClick={closeMenu}>Novedades</a>
                <a href="#" onClick={closeMenu}>Ofertas</a>
                <a href="#" onClick={closeMenu}>Más vendidos</a>
                <a href="#" onClick={closeMenu}>Próximos lanzamientos</a>
              </div>
            </li>
            
            {isAuthenticated() && (
              <li className="nav-item">
                <Link to="/biblioteca" className="nav-link" onClick={closeMenu}>BIBLIOTECA</Link>
              </li>
            )}
            
            <li className="nav-item dropdown">
              <a href="#" className="nav-link">CATEGORÍAS</a>
              <div className="dropdown-content">
                <a href="#" onClick={closeMenu}>Acción</a>
                <a href="#" onClick={closeMenu}>Aventura</a>
                <a href="#" onClick={closeMenu}>RPG</a>
                <a href="#" onClick={closeMenu}>Simulación</a>
                <a href="#" onClick={closeMenu}>Estrategia</a>
              </div>
            </li>
            
            {isAuthenticated() && (
              <li className="nav-item dropdown">
                <a href="#" className="nav-link">MI CUENTA</a>
                <div className="dropdown-content">
                  <Link to="/perfil" onClick={closeMenu}>Perfil</Link>
                  <a href="#" onClick={closeMenu}>Mis Compras</a>
                  <a href="#" onClick={handleLogout}>Cerrar Sesión</a>   
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-right">
          {isAuthenticated() ? (
            <button onClick={handleLogout} className="login-button">LOGOUT</button>
          ) : (
            <Link to="/login" className="login-button" onClick={closeMenu}>LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;