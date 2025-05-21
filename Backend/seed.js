const {
  sequelize, Usuario, Biblioteca, Juego, BibliotecaJuegos, Logro, UsuarioLogros
} = require('./models');

async function seed() {
  await sequelize.sync({ force: true }); // Borra y crea las tablas de nuevo

  // Usuarios
  const alice = await Usuario.create({ email: 'alice@example.com', nombre: 'Alice', password: 'password1' });
  const bob = await Usuario.create({ email: 'bob@example.com', nombre: 'Bob', password: 'password2' });
  const carol = await Usuario.create({ email: 'carol@example.com', nombre: 'Carol', password: 'password3' });

  // Bibliotecas
  const bibliotecaAlice = await Biblioteca.create({ usuario_id: alice.id });
  const bibliotecaBob = await Biblioteca.create({ usuario_id: bob.id });
  const bibliotecaCarol = await Biblioteca.create({ usuario_id: carol.id });

  // Juegos
  const juegos = await Juego.bulkCreate([
    { titulo: 'Stardew Valley', precio: 7.49 },
    { titulo: 'Dark Souls III', precio: 29.99 },
    { titulo: 'Sekiro: Shadows Die Twice', precio: 59.99 },
    { titulo: "Marvel's Spider-Man 2", precio: 69.99 },
    { titulo: 'Overwatch', precio: 19.99 },
    { titulo: 'Cyberpunk 2077', precio: 49.99 },
    { titulo: 'Hades', precio: 24.99 },
    { titulo: 'God of War', precio: 39.99 }
  ]);

  // Logros
  const logros = await Logro.bulkCreate([
    { nombre: 'Primer Juego', descripcion: 'Has añadido tu primer juego a la biblioteca' },
    { nombre: 'Maestro de Logros', descripcion: 'Has conseguido todos los logros de un juego' },
    { nombre: 'Maratón', descripcion: 'Has jugado más de 100 horas' },
    { nombre: 'Coleccionista', descripcion: 'Tienes más de 5 juegos en tu biblioteca' }
  ]);

  // Biblioteca_juegos
  await BibliotecaJuegos.bulkCreate([
    // Alice: Stardew Valley, Hades, God of War
    { biblioteca_id: bibliotecaAlice.id, juego_id: juegos[0].id },
    { biblioteca_id: bibliotecaAlice.id, juego_id: juegos[6].id },
    { biblioteca_id: bibliotecaAlice.id, juego_id: juegos[7].id },
    // Bob: Dark Souls III, Sekiro, Overwatch
    { biblioteca_id: bibliotecaBob.id, juego_id: juegos[1].id },
    { biblioteca_id: bibliotecaBob.id, juego_id: juegos[2].id },
    { biblioteca_id: bibliotecaBob.id, juego_id: juegos[4].id },
    // Carol: Marvel's Spider-Man 2, Cyberpunk 2077
    { biblioteca_id: bibliotecaCarol.id, juego_id: juegos[3].id },
    { biblioteca_id: bibliotecaCarol.id, juego_id: juegos[5].id }
  ]);

  // Usuario_logros
  await UsuarioLogros.bulkCreate([
    // Alice: Primer Juego, Coleccionista
    { usuario_id: alice.id, logro_id: logros[0].id },
    { usuario_id: alice.id, logro_id: logros[3].id },
    // Bob: Maratón
    { usuario_id: bob.id, logro_id: logros[2].id },
    // Carol: Primer Juego, Maestro de Logros
    { usuario_id: carol.id, logro_id: logros[0].id },
    { usuario_id: carol.id, logro_id: logros[1].id }
  ]);

  console.log('¡Datos insertados correctamente!');
  await sequelize.close();
}

seed();