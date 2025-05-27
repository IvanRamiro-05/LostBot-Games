const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const app = express();

// Permite solicitudes desde el frontend en localhost:5173 (React)
app.use(cors({ origin: 'http://localhost:5173' }));

// Configuración del puerto (usa 3000 si no hay uno definido en variables de entorno)
app.set('port', process.env.PORT || 3000);

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lostbot_games'
});

// Ruta para registrar nuevos usuarios
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validación básica de campos
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    // Verifica si el email ya está registrado
    const [existingUser] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    // Inserta el nuevo usuario
    await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verifica que se envíen ambos campos
  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan credenciales' });
  }

  try {
    // Busca al usuario por email
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    // Verificación simple de contraseña (sin hash)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera un token JWT válido por 1 hora
    const token = jwt.sign(
      { id: user.id, email: user.email },
      'tu_secreto_jwt',
      { expiresIn: '1h' }
    );

    // Devuelve el token y el nombre del usuario
    res.json({
      message: 'Login exitoso',
      token,
      username: user.nombre
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener todos los juegos
app.get('/games', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM juegos');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Ruta para obtener la biblioteca de un usuario por su ID
app.get('/users/:id/library', async (req, res) => {
  const userId = req.params.id;
  const sql = `
    SELECT juegos.* FROM juegos
    JOIN biblioteca_juegos ON juegos.id = biblioteca_juegos.juego_id
    JOIN biblioteca ON biblioteca_juegos.biblioteca_id = biblioteca.id
    WHERE biblioteca.usuario_id = ?
  `;
  try {
    const [results] = await pool.query(sql, [userId]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Ruta para obtener los logros de un usuario por su email
app.get('/logros/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Busca el ID del usuario por email
    const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);

    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuarioId = usuarios[0].id;

    // Consulta los logros del usuario
    const [logros] = await pool.query(
      `SELECT l.nombre, l.descripcion
       FROM usuario_logros ul
       JOIN logros l ON ul.logro_id = l.id
       WHERE ul.usuario_id = ?`,
      [usuarioId]
    );

    res.json(logros);
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener el ID del usuario por su email
app.get('/users/email/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const [rows] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ id: rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Ruta raíz para verificar que el backend esté funcionando
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

// Exporta la app para poder iniciarla desde otro archivo
module.exports = app;
