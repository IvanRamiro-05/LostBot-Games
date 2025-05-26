import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useSearch } from '../SearchContext'; // Importa el contexto
import logo from './imagenes/logo-03.png';
import './Estilos/Navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const { search, setSearch, setCategory } = useSearch(); // Usa el contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsActive(false);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    setSearch('');
    setIsActive(false);
    navigate('/');
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
        <li>
          <Link
            to="/"
            className="nav-link"
            onClick={() => {
              setSearch('');
              setCategory('all');
              setIsActive(false);
            }}
          >
            TIENDA
          </Link>
        </li>

        {isAuthenticated() && (
          <li>
            <Link to="/biblioteca" className="nav-link" onClick={() => setIsActive(false)}>JUEGOS EXTERNOS</Link>
          </li>
        )}

        <li className='categorias dropdown'>
          <span className="nav-link" tabIndex={0}>CATEGORÍAS</span>
          <ul className="dropdown-content">
            <li><button onClick={() => handleCategory('accion')}>Acción</button></li>
            <li><button onClick={() => handleCategory('aventura')}>Aventura</button></li>
            <li><button onClick={() => handleCategory('rpg')}>RPG</button></li>
            <li><button onClick={() => handleCategory('simulacion')}>Simulación</button></li>
            <li><button onClick={() => handleCategory('estrategia')}>Estrategia</button></li>
            <li><button onClick={() => handleCategory('deportes')}>Deportes</button></li>
            <li><button onClick={() => handleCategory('all')}>Todas</button></li>
          </ul>
        </li>

        {isAuthenticated() && (
          <li>
            <Link to="/perfil" className="nav-link" onClick={() => setIsActive(false)}>PERFIL</Link>
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