import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from './imagenes/logo-03.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="Lostbot Games" />
          </Link>
          <p>Tu destino para descubrir, comprar y jugar los mejores títulos.</p>
           <p> Ofrecemos una experiencia de juego inigualable con precios competitivos.</p>
           <h1>Redes sociales</h1>
          <div className="social-icons">
            <a href="#" className="social-icon">F</a>
            <a href="#" className="social-icon">T</a>
            <a href="#" className="social-icon">I</a>
            <a href="#" className="social-icon">Y</a>
          </div>
        </div>
       
        
        
        
        
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Lostbot Games. Todos los derechos reservados.</p>
        <p className="footer-disclaimer">
          Todas las marcas registradas pertenecen a sus respectivos dueños. Los precios y ofertas pueden variar.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
