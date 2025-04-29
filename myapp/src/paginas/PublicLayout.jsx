import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <div className="page-container">
      <Navbar />
      <main className="content-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
