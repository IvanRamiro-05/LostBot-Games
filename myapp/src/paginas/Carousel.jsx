import React, { useState, useEffect, useRef } from 'react';
import './Estilos/Carousel.css';

// Importar las imágenes directamente
import juego1 from './imagenes/juego1.jpg';
import juego2 from './imagenes/juego2.jpg';
import juego3 from './imagenes/juego3.jpg';
import juego4 from './imagenes/juego4.jpg';

const CarouselSlide = ({ image, title, description, isActive }) => {
  return (
    <div className="carousel-slide">
      <img src={image} alt={title} />
      <div className="carousel-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="carousel-btn">Comprar</button>
      </div>
    </div>
  );
};

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Carousel data - utilizando las imágenes importadas
  const slides = [
    {
      image: juego1,
      title: 'Hollow Knight',
      description: 'Sumérgete en un oscuro y fascinante mundo de insectos, donde cada rincón esconde secretos, desafíos y una belleza melancólica que te atrapará desde el primer momento.'
    },
    {
      image: juego2,
      title: 'Elden Ring',
      description: 'Explora un vasto y épico mundo lleno de misterios, combates desafiantes y una historia profunda que te invita a forjar tu propio destino en las Tierras Intermedias.'
    },
    {
      image: juego3,
      title: 'Undertale',
      description: 'Descubre un juego donde tus decisiones importan, con personajes entrañables, un humor único y una narrativa que te tocará el corazón mientras decides ser un héroe o un villano.'
    },
    {
      image: juego4,
      title: 'Red Dead Redemption II',
      description: 'Vive una experiencia inmersiva en el salvaje oeste, donde cada decisión, cada encuentro y cada paisaje te harán sentir parte de una historia épica llena de honor, traición y redención.'
    }
  ];

  // El resto del código permanece igual
  useEffect(() => {
    const startSlideShow = () => {
      intervalRef.current = setInterval(() => {
        if (!isHovering) {
          goToSlide((currentIndex + 1) % slides.length);
        }
      }, 5000);
    };

    startSlideShow();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex, isHovering, slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  };

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    carouselRef.current.setAttribute('data-start-x', touchStartX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchStartX = parseInt(carouselRef.current.getAttribute('data-start-x'));
    
    if (touchEndX < touchStartX - 50) {
      // Swipe left
      handleNext();
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right
      handlePrev();
    }
  };

  return (
    <div className="carousel-container">
      <div 
        className="carousel" 
        ref={carouselRef}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <CarouselSlide 
            key={index}
            image={slide.image}
            title={slide.title}
            description={slide.description}
            isActive={currentIndex === index}
          />
        ))}
      </div>
      
      <div className="carousel-nav">
        <button onClick={handlePrev}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>
      
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;