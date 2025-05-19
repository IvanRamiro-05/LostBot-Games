import React from 'react';
import { Link } from 'react-router-dom';
import './Estilos/Footer.css';
import logo from './imagenes/logo-03.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="Lostbot Games" />
          </Link>

          <div className="contact-btn-container">
            <Link to="/autores" className="contact-btn">
              Conoce a nuestro equipo
            </Link>
          </div>
      
          <p>Tu destino para descubrir, comprar y jugar los mejores títulos.</p>
          <p>Ofrecemos una experiencia de juego inigualable con precios competitivos.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">F</a> 
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">I</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">X</a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">Y</a>
          </div>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Lostbot Games. Todos los derechos reservados.</p>
      </div>
     
    </footer>
  );
};

export default Footer;