import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import './Estilos/Perfil.css';

const Perfil = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  
  
// Estado para almacenar los logros

const [logros, setLogros] = useState([]);
useEffect(() => {
  const fetchLogros = async () => {
    try {
      console.log('Email para logros:', currentUser.email);
      const email = currentUser.email;

      const res = await fetch(`http://localhost:3000/logros/${encodeURIComponent(email)}`);
      if (!res.ok) {
        console.error('Error en la respuesta:', res.status);
        return;
      }
      const data = await res.json();
      console.log('Logros recibidos:', data);
      setLogros(data);
    } catch (err) {
      console.error('Error al obtener logros:', err);
    }
  };

  if (currentUser?.email) {
    fetchLogros();
  }
}, [currentUser]);

console.log('Estado logros:', logros);

  return (
    <div className="perfil-page">
      <div className="perfil-header">
        <div className="perfil-avatar">
          {currentUser?.username?.charAt(0) || '?'}
        </div>
        <div className="perfil-title">
          <h1>{currentUser?.username || 'Invitado'}</h1>
          <p className="perfil-email">{currentUser?.email || 'No disponible'}</p>
        </div>
      </div>

      <div className="perfil-tabs">
        <button 
          className={activeTab === 'info' ? 'active' : ''} 
          onClick={() => setActiveTab('info')}
        >
          Información
        </button>
        <button 
          className={activeTab === 'biblioteca' ? 'active' : ''} 
          onClick={() => setActiveTab('biblioteca')}
        >
          Mis Juegos
        </button>
        <button 
          className={activeTab === 'logros' ? 'active' : ''} 
          onClick={() => setActiveTab('logros')}
        >
          Logros
        </button>
      </div>

      <div className="perfil-content">
        {activeTab === 'info' && (
          <div className="info-panel">
            <div className="info-card">
              <h2>Información Personal</h2>
              <div className="info-item">
                <span>Usuario:</span>
                <p>{currentUser?.username || 'No disponible'}</p>
              </div>
              <div className="info-item">
                <span>Email:</span>
                <p>{currentUser?.email || 'No disponible'}</p>
              </div>
              <div className="info-item">
                <span>Miembro desde:</span>
                <p>Mayo 2025</p>
              </div>
            </div>
            
            <div className="info-card">
              <h2>Estadísticas</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Juegos</span>
                </div>
                   
    <div className="stat-item">
      <span className="stat-number">{logros.length}</span>
      <span className="stat-label">Logros</span>
    </div>

                <div className="stat-item">
                  <span className="stat-number">67</span>
                  <span className="stat-label">Horas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Amigos</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'biblioteca' && (
          <div className="biblioteca-panel">
            <h2>Mi Biblioteca de Juegos</h2>
            <Link to="/biblioteca" className="view-all-btn">Ver todos mis juegos</Link>
            <div className="games-grid">
              {/* Aquí irían los juegos del usuario */}
              <div className="game-card">
                <div className="game-image placeholder"></div>
                <h3>Juego 1</h3>
                <p>Último juego: Ayer</p>
              </div>
              <div className="game-card">
                <div className="game-image placeholder"></div>
                <h3>Juego 2</h3>
                <p>Último juego: Hace 3 días</p>
              </div>
              <div className="game-card">
                <div className="game-image placeholder"></div>
                <h3>Juego 3</h3>
                <p>Último juego: Hace 1 semana</p>
              </div>
            </div>
          </div>
        )}


 {activeTab === 'logros' && (
  <div className="logros-panel">
    <h2>Mis Logros</h2>
    <div className="logros-list">
      {logros.length === 0 ? (
        <p>No tienes logros aún.</p>
      ) : (
        logros.map((logro, index) => (
          <div className="logro-item" key={index}>
            <div className="logro-icon">🏆</div>
            <div className="logro-details">
              <h3>{logro.nombre}</h3>
              <p>{logro.descripcion}</p>
            </div>
            <div className="logro-date">
              {logro.fecha ? logro.fecha.substring(0, 10) : 'Sin fecha'}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}
      </div>
    </div>
  );
}
export default Perfil;