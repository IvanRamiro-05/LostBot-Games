import React from 'react';
import { Link } from 'react-router-dom';
import './NoPage.css';

const NoPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>¡Página no encontrada!</h2>
        <p>Parece que te has perdido en el ciberespacio de los videojuegos.</p>
        <p>La página que buscas no existe o ha sido movida a otra ubicación.</p>
        <Link to="/" className="home-button">Volver a la tienda</Link>
      </div>
    </div>
  );
};

export default NoPage;
