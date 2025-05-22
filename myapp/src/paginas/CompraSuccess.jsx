import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Estilos/CompraSuccess.css';

const CompraSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { game, orderNumber } = location.state || { game: null, orderNumber: null };
  
  if (!game) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          No se encontró información de la compra.
        </div>
        <button 
          className="btn btn-primary mt-3" 
          onClick={() => navigate('/')}
        >
          Volver a la tienda
        </button>
      </div>
    );
  }
  
  return (
   <div className="Compra-success-container">
      <div className="container py-5">
        <div className="card border-success mb-3 mx-auto" style={{ maxWidth: "800px" }}>
          <div className="card-header bg-success text-white">
            <h3 className="text-center mb-0">¡Compra Exitosa!</h3>
          </div>
          <div className="card-body text-center">
            <div className="success-icon mb-4">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h4 className="card-title mb-4">Gracias por tu compra</h4>
            
            <div className="order-details p-4 mb-4">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img src={game.image} alt={game.title} className="img-fluid rounded" />
                </div>
                <div className="col-md-9 text-start">
                  <h5>{game.title}</h5>
                  <p className="text-muted">{game.description.substring(0, 100)}...</p>
                  <p className="mb-0"><strong>Precio:</strong> ${game.price}</p>
                </div>
              </div>
            </div>
            
            <div className="order-info mb-4">
              <h5>Detalles de la orden</h5>
              <p><strong>Número de Orden:</strong> #{orderNumber}</p>
              <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Método de Pago:</strong> Tarjeta de crédito</p>
            </div>

            {/* Botón de descarga de imagen */}
            <div className="download-section mb-4">
            <h5>Descarga tu juego</h5>
            <a 
            href={game.image} 
            className="btn btn-success btn-lg" 
            download={game.title.replace(/\s+/g, '_') + ".jpg"} 
            >
            Descargar Juego
            </a>
          </div>

            <div className="next-steps mb-4">
              <h5>Próximos pasos</h5>
              <p>Recibirás un correo electrónico con los detalles de tu compra y las instrucciones para descargar o activar tu juego.</p>
            </div>
            
            <div className="row mt-4">
              <div className="col-md-6">
                <button 
                  className="btn btn-primary btn-lg w-100 mb-2"
                  onClick={() => navigate('/biblioteca')}
                >
                  Ir a Mi Biblioteca
                </button>
              </div>
              <div className="col-md-6">
                <button 
                  className="btn btn-outline-secondary btn-lg w-100"
                  onClick={() => navigate('/')}
                >
                  Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraSuccess;

