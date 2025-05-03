import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo from './imagenes/logo-03.png';
import './Estilos/Navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsActive(false);
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav>
      
      <Link to="/">
        <img src={logo} className="logo" alt="LostBot Games" />
      </Link>

      <div className={`search-container ${isActive ? 'active' : ''}`}>
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Buscar..." 
        />
      </div>
      
      <ul className={isActive ? 'active' : ''}>
        {/* Rutas públicas */}
        <li>
          <Link to="/" onClick={() => setIsActive(false)}>INICIO</Link>
        </li>

        

        {/* Pestaña desplegable de TIENDA */}
        <li className="dropdown">
          <span>TIENDA</span>
          <ul className="dropdown-content">
            <li>
              <Link to="/novedades" onClick={() => setIsActive(false)}>Novedades</Link>
            </li>
            <li>
              <Link to="/ofertas" onClick={() => setIsActive(false)}>Ofertas</Link>
            </li>
            <li>
              <Link to="/mas-vendidos" onClick={() => setIsActive(false)}>Más Vendidos</Link>
            </li>
            <li>
              <Link to="/proximos-lanzamientos" onClick={() => setIsActive(false)}>Próximos Lanzamientos</Link>
            </li>
          </ul>
        </li>

        {/* Pestaña desplegable de CATEGORÍAS */}
        <li className="dropdown">
          <span>CATEGORÍAS</span>
          <ul className="dropdown-content">
            <li>
              <Link to="/categorias/fps" onClick={() => setIsActive(false)}>FPS</Link>
            </li>
            <li>
              <Link to="/categorias/moba" onClick={() => setIsActive(false)}>MOBA</Link>
            </li>
            <li>
              <Link to="/categorias/rpg" onClick={() => setIsActive(false)}>RPG</Link>
            </li>
            <li>
              <Link to="/categorias/sandbox" onClick={() => setIsActive(false)}>Sandbox</Link>
            </li>
          </ul>
        </li>

        {/* Rutas protegidas */}
        {isAuthenticated() && (
          <>
            <li>
              <Link to="/perfil" onClick={() => setIsActive(false)}>PERFIL</Link>
            </li>
            <li>
              <Link to="/biblioteca" onClick={() => setIsActive(false)}>BIBLIOTECA</Link>
            </li>
          </>
        )}

        {/* Login/Logout */}
        <li>
        {isAuthenticated() ? (
            <Link to="/" onClick={handleLogout}>
              LOGOUT
            </Link>
          ) : (
            <Link to="/login" onClick={() => setIsActive(false)}>
              LOGIN
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;