import { useState } from 'react';

const ZonaJuego = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Lista de juegos en la nube con sus categorías y enlaces
  const cloudGames = [
    {
      id: 1,
      title: "Fortnite",
      description: "Batalla real con construcción de estructuras",
      category: "battle-royale",
      playLink: "https://www.epicgames.com/fortnite/",
      platform: "Epic Games"
    },
    {
      id: 2,
      title: "League of Legends",
      description: "MOBA 5v5 con más de 150 campeones",
      category: "moba",
      playLink: "https://na.leagueoflegends.com/",
      platform: "Riot Games"
    },
    {
      id: 3,
      title: "Apex Legends",
      description: "Battle Royale en primera persona con habilidades únicas",
      category: "battle-royale",
      playLink: "https://www.ea.com/games/apex-legends",
      platform: "EA"
    },
    {
      id: 4,
      title: "Minecraft",
      description: "Juego de construcción y aventura en un mundo de bloques",
      category: "sandbox",
      playLink: "https://www.minecraft.net/",
      platform: "Mojang"
    },
    {
      id: 5,
      title: "Counter-Strike 2",
      description: "FPS táctico por equipos",
      category: "fps",
      playLink: "https://www.counter-strike.net/",
      platform: "Steam"
    },
    {
      id: 6,
      title: "Dota 2",
      description: "MOBA estratégico con más de 100 héroes",
      category: "moba",
      playLink: "https://www.dota2.com/",
      platform: "Steam"
    },
    {
      id: 7,
      title: "Genshin Impact",
      description: "RPG de mundo abierto con elementos gacha",
      category: "rpg",
      playLink: "https://genshin.hoyoverse.com/",
      platform: "miHoYo"
    },
    {
      id: 8,
      title: "Valorant",
      description: "FPS táctico con agentes que poseen habilidades únicas",
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
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Zona de Juegos en la Nube</h1>
          <p className="text-gray-600">Explora y juega directamente desde tu navegador sin necesidad de descargas</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button 
              key={category.value}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.value 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map(game => (
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:scale-105" key={game.id}>
              <div className="relative h-48 bg-gray-300">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  {game.title}
                </div>
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {game.platform}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <a 
                  href={game.playLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded transition-colors"
                >
                  Jugar Ahora
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZonaJuego;