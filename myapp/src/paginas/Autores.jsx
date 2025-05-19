import React from 'react';
import './Estilos/Autores.css';

// Importa las imágenes de los autores
import autor1 from './imagenes/Ivan.png';
import autor2 from './imagenes/Olarte.png';
import autor3 from './imagenes/Julian.png';
import autor4 from './imagenes/Salazar.png';
import autor5 from './imagenes/Huerstas.png';

const Autores = () => {
  // Array con información de los autores
  const autores = [
    {
      id: 1,
      nombre: "Ivan Ramiro Suarez Diaz",
      rol: "Frontend Developer",
      descripcion: "Encargado del diseño e implementación de la interfaz de usuario.",
      imagen: autor1,
      github: "https://github.com/IvanRamiro-05",
      linkedin: "https://www.linkedin.com/feed/"
    },
    {
      id: 2,
      nombre: "Snheider Alejandro Olarte",
      rol: "Backend Developer",
      descripcion: "Responsable de la lógica del servidor y bases de datos.",
      imagen: autor2,
      github: "https://github.com/olarte18",
      linkedin: "https://www.linkedin.com/in/alejandro-olarte-5b895b275/"
    },
    {
      id: 3,
      nombre: "Julian Javier Lizcano",
      rol: "UX/UI Designer",
      descripcion: "Diseñador de experiencia de usuario e interfaz gráfica.",
      imagen: autor3,
      github: "https://github.com/jjlizcano",
      linkedin: "https://linkedin.com/in/autor3"
    },
    {
      id: 4,
      nombre: "Alejandro Salazar Rincón",
      rol: "Backend Developer",
      descripcion: "Responsable de la lógica del servidor y bases de datos.",
      imagen: autor4,
      github: "https://github.com/alejosarin1",
      linkedin: "https://linkedin.com/in/autor4"
    },
    {
      id: 5,
      nombre: "Juan Esteban Huertas",
      rol: "Frontend Developer",
      descripcion: "Diseñador de experiencia de usuario e interfaz gráfica.",
      imagen: autor5,
      github: "https://github.com/juanhuertas0702",
      linkedin: "https://linkedin.com/in/autor5"
    }
  ];

  return (
    <div className="autores-container">
      <div className="autores-hero">
        <h1>Nuestro Equipo</h1>
        <p>Conoce a las mentes creativas detrás de LostBot Games</p>
      </div>

      <div className="autores-grid">
        {autores.map(autor => (
          <div className="autor-card" key={autor.id}>
            <div className="autor-image">
              <img src={autor.imagen} alt={autor.nombre} />
              <div className="autor-overlay">
                <div className="autor-links">
                  <a href={autor.github} target="_blank" rel="noopener noreferrer" className="autor-link github">
                    <i className="fab fa-github"></i> GitHub
                  </a>
                  <a href={autor.linkedin} target="_blank" rel="noopener noreferrer" className="autor-link linkedin">
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="autor-info">
              <h2>{autor.nombre}</h2>
              <h3>{autor.rol}</h3>
              <p>{autor.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="autores-extra">
        <h2>Sobre el Proyecto</h2>
        <p>
          LostBot Games es un proyecto desarrollado para el curso de Programación en la Web. 
          Nuestra misión es crear una plataforma de juegos intuitiva y atractiva que 
          ofrezca a los usuarios una experiencia única y memorable.
        </p>
        <div className="tecnologias">
          <h3>Tecnologías utilizadas</h3>
          <div className="tech-icons">
            <span>React</span>
            <span>JavaScript</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autores;