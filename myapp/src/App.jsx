import React from 'react';
import './paginas/Estilos/App.css';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './paginas/PublicLayout';
import OutletContent from './paginas/OutletContent';
import Home from './paginas/Home';
import Login from './paginas/Login/Login';
import NoPage from './paginas/NoPage';
import ProtectedRoute from './ProtectedRoute';
import Perfil from './paginas/Perfil';
import ZonaJuego from './paginas/ZonaJuego';
import GameSection from './paginas/GameSection';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/games" element={<GameSection />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<OutletContent />}>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/biblioteca" element={<ZonaJuego />} />
          </Route>
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
};

export default App;