import React, { useState } from 'react';
import './ZonaJuego.css';

const ZonaJuego = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Lista de juegos en la nube con sus categorías y enlaces
  const cloudGames = [
    {
      id: 1,
      title: "Fortnite",
      description: "Batalla real con construcción de estructuras",
      imageUrl: "https://via.placeholder.com/300x180.png?text=Fortnite",
      category: "battle-royale",
      playLink: "https://www.epicgames.com/fortnite/",
      platform: "Epic Games"
    },
    {
      id: 2,
      title: "League of Legends",
      description: "MOBA 5v5 con más de 150 campeones",
      imageUrl: "https://via.placeholder.com/300x180.png?text=League+of+Legends",
      category: "moba",
      playLink: "https://na.leagueoflegends.com/",
      platform: "Riot Games"
    },
    {
      id: 3,
      title: "Apex Legends",
      description: "Battle Royale en primera persona con habilidades únicas",
      imageUrl: "https://via.placeholder.com/300x180.png?text=Apex+Legends",
      category: "battle-royale",
      playLink: "https://www.ea.com/games/apex-legends",
      platform: "EA"
    },
    {
      id: 4,
      title: "Minecraft",
      description: "Juego de construcción y aventura en un mundo de bloques",
      imageUrl: "https://via.placeholder.com/300x180.png?text=Minecraft",
      category: "sandbox",
      playLink: "https://www.minecraft.net/",
      platform: "Mojang"
    },
    {
      id: 5,
      title: "Counter-Strike 2",
      description: "FPS táctico por equipos",
      imageUrl: "https://via.placeholder.com/300x180.png?text=Counter-Strike+2",
      category: "fps",
      playLink: "https://www.counter-strike.net/",
      platform: "Steam"
    },
    {
      id: 6,
      title: "Dota 2",
      description: "MOBA estratégico con más de 100 héroes",
      imageUrl: "https://via.placeholder.com/300x180.png?text=Dota+2",
      category: "moba",
      playLink: "https://www.dota2.com/",
      platform: "Steam"
    },
    {
      id: 7,
      title: "Genshin Impact",
      description: "RPG de mundo abierto con elementos gacha",
      imageUrl: "https://via.placeholder.com/300x180.png?text=Genshin+Impact",
      category: "rpg",
      playLink: "https://genshin.hoyoverse.com/",
      platform: "miHoYo"
    },
    {
      id: 8,
      title: "Valorant",
      description: "FPS táctico con agentes que poseen habilidades únicas",
      imageUrl: "https://via.placeholder.com/300x180.png?text=Valorant",
      category: "fps",
      playLink: "https://playvalorant.com/",
      platform: "Riot Games"
    }
  ];

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'fps', label: 'FPS' },
    { value: 'battle-royale', label: 'Battle Royale' },
    { value: 'moba', label: 'MOBA' },
    { value: 'rpg', label: 'RPG' },
    { value: 'sandbox', label: 'Sandbox' },
  ];

  // Filtrar juegos según la categoría seleccionada
  const filteredGames = selectedCategory === 'all' 
    ? cloudGames 
    : cloudGames.filter(game => game.category === selectedCategory);

  return (
    <div className="zona-juego">
      <div className="zona-header">
        <h1>Zona de Juegos en la Nube</h1>
        <p>Explora y juega directamente desde tu navegador sin necesidad de descargas</p>
      </div>
      
      <div className="category-filter">
        {categories.map(category => (
          <button 
            key={category.value}
            className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="games-grid">
        {filteredGames.map(game => (
          <div className="cloud-game-card" key={game.id}>
            <div className="game-image">
              <img src={game.imageUrl} alt={game.title} />
              <div className="platform-badge">{game.platform}</div>
            </div>
            <div className="game-info">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <a href={game.playLink} target="_blank" rel="noopener noreferrer" className="play-now-btn">
                Jugar Ahora
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZonaJuego;
