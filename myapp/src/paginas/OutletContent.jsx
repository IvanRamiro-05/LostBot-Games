import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Este componente sirve para crear un layout para las rutas protegidas
const OutletContent = () => {
  return (
    <div className="authenticated-container">
      <Navbar />
      <main className="authenticated-content">
        {/* Aquí se renderizarán las rutas anidadas */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default OutletContent;
