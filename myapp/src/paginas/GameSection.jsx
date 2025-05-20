import React from 'react';
import './Estilos/GameSection.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Importar las imágenes directamente
import juego6 from './imagenes/juego6.jpg';
import juego7 from './imagenes/juego7.jpg';
import juego8 from './imagenes/juego8.jpg';
import juego9 from './imagenes/juego9.jpg';
import juego10 from './imagenes/juego10.jpg';
import juego11 from './imagenes/juego11.jpg';
import juego12 from './imagenes/juego12.jpg';
import juego13 from './imagenes/juego13.jpg';

const GameCard = ({ game }) => {
  const { image, title, description, price, originalPrice, discount, genres } = game;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const handleCompra = () => {
    if (isAuthenticated()) {
      // Redirigir al formulario de compra con los datos del juego
      navigate('/Compra', { state: { game } });
    } else {
      // Redirigir a la página de login
      navigate('/login');
    }
  };
  
  return (
    <div className="game-card">
      <img src={image} alt={title} />
      {discount && <div className="discount-badge">-{discount}%</div>}
      <div className="game-card-content">
        {genres.map((genre, index) => (
          <span key={index} className="genre-tag">{genre}</span>
        ))}
        <h3 className="game-title">{title}</h3>
        <p className="game-description">{description}</p>
        <p className="game-price">
          ${price} {originalPrice && <strike>${originalPrice}</strike>}
        </p>
        <div className="game-buttons">
          <button 
            className="game-button buy-button"
            onClick={handleCompra}
          >
            {price === 'Gratis' ? 'Descargar' : 'Comprar'}
          </button>
        </div>
      </div>
    </div>
  );
};

const GameSection = () => {
  // Game data con imágenes importadas
  const games = [
    {
      image: juego6,
      title: 'Stardew Valley',
      description: 'Un encantador simulador de granja donde heredas la antigua parcela de tu abuelo y te embarcas en una vida en el campo: cultiva cosechas, cría animales, haz amigos y explora un mundo lleno de sorpresas y magia.',
      price: '7.49',
      originalPrice: '14.99',
      discount: '50',
      genres: ['Simulación', 'RPG']
    },
    {
      image: juego7,
      title: 'Dark Souls III',
      description: 'Un desafiante RPG de acción ambientado en un mundo oscuro y decadente. Enfréntate a temibles jefes mientras exploras un universo interconectado lleno de secretos, peligros y una narrativa sombría.',
      price: '18.99',
      genres: ['RPG', 'Acción']
    },
    {
      image: juego8,
      title: 'Sekiro: Shadows Die Twice',
      description: 'Un intenso juego de acción donde juegas como "Lobo", un shinobi desfigurado que busca venganza contra el clan samurái que lo atacó y secuestró a su maestro, con mecánicas de combate basadas en desvíos y contraataques.',
      price: '14.99',
      originalPrice: '20.99',
      discount: '30',
      genres: ['Acción', 'Aventura']
    },
    {
      image: juego9,
      title: 'Marvel\'s Spider-Man 2',
      description: 'Una aventura épica donde controlas tanto a Peter Parker como a Miles Morales enfrentando a nuevos villanos en un Nueva York abierto y vibrante, con nuevas mecánicas, poderes y una historia cinemática cautivadora.',
      price: '29.99',
      originalPrice: '49.99',
      discount: '40',
      genres: ['Acción', 'Mundo Abierto']
    },
    {
      image: juego10,
      title: 'Overwatch',
      description: 'Un shooter en equipo vibrante y dinámico donde seleccionas héroes con habilidades únicas para enfrentarte a otros jugadores en diversos modos de juego, combinando estrategia y acción en mapas globales llenos de color.',
      price: 'Gratis',
      genres: ['FPS', 'Multijugador']
    },
    {
      image: juego11,
      title: 'Cyberpunk 2077',
      description: 'Sumérgete en Night City, una megalópolis obsesionada con el poder y las modificaciones corporales. Como V, un mercenario fuera de la ley, persigues un implante único que es la clave de la inmortalidad.',
      price: '44.99',
      originalPrice: '59.99',
      discount: '25',
      genres: ['RPG', 'Mundo Abierto']
    },
    {
      image: juego12,
      title: 'Hades',
      description: 'Un roguelike de acción donde juegas como Zagreo, hijo de Hades, intentando escapar del inframundo. Cada intento fracasado te hace más fuerte y desbloquea más historia en este brillante juego de Supergiant Games.',
      price: '24.99',
      genres: ['Roguelike', 'Acción']
    },
    {
      image: juego13,
      title: 'God of War',
      description: 'Acompaña a Kratos y su hijo Atreus en un viaje épico a través de los reinos nórdicos. Una reinvención de la saga que combina combate brutal con una narrativa emotiva sobre el vínculo entre padre e hijo.',
      price: '25.99',
      originalPrice: '39.99',
      discount: '35',
      genres: ['Acción', 'Aventura']
    }
  ];

  return (
    <section className="games-section">
      <h2 className="section-title">Juegos destacados</h2>
      <div className="games-grid">
        {games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </section>
  );
};

export default GameSection;