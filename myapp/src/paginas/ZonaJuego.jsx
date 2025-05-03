import { useState } from 'react';
import './Estilos/ZonaJuego.css';

const ZonaJuego = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lista de juegos en la nube con sus categorías y enlaces
  const cloudGames = [
    {
      id: 1,
      title: "Fortnite",
      description: "Batalla real con construcción de estructuras",
      category: "battle-royale",
      playLink: "https://www.epicgames.com/fortnite/",
      platform: "Epic Games",
      trending: true,
      rating: 4.5,
      players: "Multijugador",
      releaseDate: "2017"
    },
    {
      id: 2,
      title: "League of Legends",
      description: "MOBA 5v5 con más de 150 campeones",
      category: "moba",
      playLink: "https://na.leagueoflegends.com/",
      platform: "Riot Games",
      trending: false,
      rating: 4.2,
      players: "Multijugador",
      releaseDate: "2009"
    },
    {
      id: 3,
      title: "Apex Legends",
      description: "Battle Royale en primera persona con habilidades únicas",
      category: "battle-royale",
      playLink: "https://www.ea.com/games/apex-legends",
      platform: "EA",
      trending: true,
      rating: 4.3,
      players: "Multijugador",
      releaseDate: "2019"
    },
    {
      id: 4,
      title: "Minecraft",
      description: "Juego de construcción y aventura en un mundo de bloques",
      category: "sandbox",
      playLink: "https://www.minecraft.net/",
      platform: "Mojang",
      trending: false,
      rating: 4.8,
      players: "Multijugador/Un jugador",
      releaseDate: "2011"
    },
    {
      id: 5,
      title: "Counter-Strike 2",
      description: "FPS táctico por equipos",
      category: "fps",
      playLink: "https://www.counter-strike.net/",
      platform: "Steam",
      trending: true,
      rating: 4.6,
      players: "Multijugador",
      releaseDate: "2023"
    },
    {
      id: 6,
      title: "Dota 2",
      description: "MOBA estratégico con más de 100 héroes",
      category: "moba",
      playLink: "https://www.dota2.com/",
      platform: "Steam",
      trending: false,
      rating: 4.4,
      players: "Multijugador",
      releaseDate: "2013"
    },
    {
      id: 7,
      title: "Genshin Impact",
      description: "RPG de mundo abierto con elementos gacha",
      category: "rpg",
      playLink: "https://genshin.hoyoverse.com/",
      platform: "miHoYo",
      trending: true,
      rating: 4.5,
      players: "Un jugador/Co-op",
      releaseDate: "2020"
    },
    {
      id: 8,
      title: "Valorant",
      description: "FPS táctico con agentes que poseen habilidades únicas",
      category: "fps",
      playLink: "https://playvalorant.com/",
      platform: "Riot Games",
      trending: true,
      rating: 4.7,
      players: "Multijugador",
      releaseDate: "2020"
    }
  ];

  const categories = [
    { value: 'all', label: 'Todos los Juegos', icon: '🎮' },
    { value: 'fps', label: 'Shooters (FPS)', icon: '🔫' },
    { value: 'battle-royale', label: 'Battle Royale', icon: '🏆' },
    { value: 'moba', label: 'MOBA', icon: '⚔️' },
    { value: 'rpg', label: 'RPG', icon: '🧙‍♂️' },
    { value: 'sandbox', label: 'Sandbox', icon: '🏗️' },
  ];

  // Filtrar juegos según la categoría seleccionada y búsqueda
  const filteredGames = cloudGames
    .filter(game => selectedCategory === 'all' || game.category === selectedCategory)
    .filter(game => searchQuery === '' || 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()));

  // Función para renderizar estrellas según rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star">☆</span>);
    }
    
    return (
      <div className="game-rating">
        <div style={{ color: '#8e0303' }}>{stars}</div>
        <span>{rating}/5</span>
      </div>
    );
  };

  return (
    <div className="biblioteca-container">
      <div className="biblioteca-hero">
        <div className="hero-content">
          <h1>Zona de Juegos Premium</h1>
          <p>Explora nuestra selección de juegos en la nube y disfruta de la mejor experiencia gaming sin descargas</p>
          
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input 
              className="search-input" 
              type="text" 
              placeholder="Buscar juegos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="biblioteca-main">
        <div className="biblioteca-sidebar">
          <div className="sidebar-section">
            <h3>Categorías</h3>
            <ul className="category-list">
              {categories.map(category => (
                <li 
                  key={category.value}
                  className={selectedCategory === category.value ? 'active' : ''}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <span style={{ marginRight: '10px' }}>{category.icon}</span>
                  {category.label}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3>Ordenar Por</h3>
            <select className="sort-select">
              <option value="popular">Popularidad</option>
              <option value="recent">Más recientes</option>
              <option value="rating">Mejor valorados</option>
              <option value="name">Alfabético</option>
            </select>
          </div>
        </div>
        
        <div className="biblioteca-content">
          {/* Juegos destacados */}
          <div className="featured-section">
            <h2>Juegos Destacados</h2>
            <div className="featured-games">
              {filteredGames
                .filter(game => game.trending)
                .slice(0, 2)
                .map(game => (
                  <div className="featured-game-card" key={`featured-${game.id}`}>
                    <div 
                      className="featured-game-image" 
                      style={{ 
                        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), 
                        #${Math.floor(Math.random()*16777215).toString(16)}` 
                      }}
                    >
                      <div className="platform-badge">{game.platform}</div>
                    </div>
                    <div className="featured-game-content">
                      <h3>{game.title}</h3>
                      {renderRating(game.rating)}
                      <p>{game.description}</p>
                      <div className="game-stats">
                        <div className="stat-item">👥 {game.players}</div>
                        <div className="stat-item">📅 {game.releaseDate}</div>
                      </div>
                      <a 
                        href={game.playLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="play-button"
                      >
                        Jugar Ahora
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Todos los juegos */}
          <div className="games-section">
            <h2>
              Todos los Juegos
              <small>({filteredGames.length} juegos encontrados)</small>
            </h2>
            
            {filteredGames.length > 0 ? (
              <div className="games-grid">
                {filteredGames.map(game => (
                  <div className="game-card" key={game.id}>
                    <div 
                      className="game-image" 
                      style={{ 
                        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), 
                        #${Math.floor(Math.random()*16777215).toString(16)}` 
                      }}
                    >
                      {game.trending && <div className="trending-badge">Trending</div>}
                      <div className="platform-badge">{game.platform}</div>
                    </div>
                    <div className="game-content">
                      <h3>{game.title}</h3>
                      {renderRating(game.rating)}
                      <p className="game-description">{game.description}</p>
                      <div className="game-meta">
                        <div className="stat-item">
                          {categories.find(cat => cat.value === game.category)?.icon || '🎮'} 
                          {categories.find(cat => cat.value === game.category)?.label.split(' ')[0] || game.category}
                        </div>
                      </div>
                      <a 
                        href={game.playLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="play-button"
                      >
                        Jugar Ahora
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-games">
                <div className="no-games-icon">🎮</div>
                <p>No se encontraron juegos que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZonaJuego;