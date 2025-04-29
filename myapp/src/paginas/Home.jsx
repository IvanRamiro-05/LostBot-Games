import React from 'react';
import Carousel from './Carousel';
import GameSection from './GameSection';

const Home = () => {
  return (
    <div className="home-container">
      <Carousel />
      <GameSection />
    </div>
  );
};

export default Home;
