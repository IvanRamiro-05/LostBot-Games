// App.jsx
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Componentes públicos
import PublicLayout from './paginas/PublicLayout';
import Home from './paginas/Home';
import Login from './paginas/Login/Login';
import NoPage from './paginas/NoPage';
import Carousel from './paginas/Carousel';
import GameSection from './paginas/GameSection';

// Componentes protegidos
import ProtectedRoute from './ProtectedRoute';
import ZonaJuego from './paginas/ZonaJuego';
import OutletContent from './paginas/OutletContent';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/games" element={<GameSection />} />

        </Route>

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<OutletContent />}>
            <Route path="/biblioteca" element={<ZonaJuego />} />
            <Route path="/perfil" element={<div>Perfil del Usuario</div>} />
          </Route>
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
};

export default App;