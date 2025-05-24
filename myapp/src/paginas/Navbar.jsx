import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useSearch } from '../SearchContext'; // <-- Importa esto
import logo from './imagenes/logo-03.png';
import './Estilos/Navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const { search, setSearch } = useSearch(); // <-- Usa el contexto
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

      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`search-container ${isActive ? 'active' : ''}`}>
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Buscar..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      
      <ul className={isActive ? 'active' : ''}>
        {/* Pestaña desplegable de TIENDA */}
        <li className="tienda dropdown">
          <Link to="/" onClick={() => setIsActive(false)}>TIENDA</Link>
          <ul className="dropdown-content">
            <li><Link to="/tienda/novedades">Novedades</Link></li>
            <li><Link to="/tienda/ofertas">Ofertas</Link></li>
            <li><Link to="/tienda/mas-vendidos">Más Vendidos</Link></li>
            <li><Link to="/tienda/proximos">Próximos Lanzamientos</Link></li>
          </ul>
        </li>

        {isAuthenticated() && (
          <li>
            <Link to="/biblioteca" onClick={() => setIsActive(false)}>BIBLIOTECA</Link>
          </li>
        )}

        <li className='categorias dropdown'>
          <Link to="/" onClick={() => setIsActive(false)}>CATEGORÍAS</Link>
          <ul className="dropdown-content">
            <li><Link to="/categorias/accion">Acción</Link></li>
            <li><Link to="/categorias/aventura">Aventura</Link></li>
            <li><Link to="/categorias/rpg">RPG</Link></li>
            <li><Link to="/categorias/simulacion">Simulación</Link></li>
            <li><Link to="/categorias/estrategia">Estrategia</Link></li>
            <li><Link to="/categorias/deportes">Deportes</Link></li>
          </ul>
        </li>

        {isAuthenticated() && (
          <li>
            <Link to="/perfil" onClick={() => setIsActive(false)}>PERFIL</Link>
          </li>
        )}
    
        <li className="login">
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