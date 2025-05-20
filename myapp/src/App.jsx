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
import CompraForm from './paginas/CompraForm';
import CompraSuccess from './paginas/CompraSuccess';
import Registro from './paginas/Registro';
import Autores from './paginas/Autores'; 
const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/games" element={<GameSection />} />
          <Route path="/autores" element={<Autores />} /> {/* Nueva ruta para la página de autores */}
        </Route>

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<OutletContent />}>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/biblioteca" element={<ZonaJuego />} />
            <Route path="/Compra" element={<CompraForm />} />
            <Route path="/Compra-success" element={<CompraSuccess />} />
          </Route>
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
};

fetch('http://localhost:3000/')  // o la ruta que definiste en tu backend
  .then(response => {
    if (!response.ok) throw new Error('Error en la respuesta');
    return response.text();       // o response.json() si es JSON
  })
  .then(data => {
    console.log('Respuesta del backend:', data);
    // Aquí puedes actualizar tu UI con los datos recibidos
  })
  .catch(error => {
    console.error('Error al conectar con el backend:', error);
  });
  
export default App;