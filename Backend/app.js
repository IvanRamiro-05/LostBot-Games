// app.js (o donde sea que crees app)
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const mysql = require('mysql2/promise');
app.use(cors({
  origin: 'http://localhost:5173'  // Cambia a la URL y puerto donde corre tu frontend React
}));

app.set('port', process.env.PORT || 3000);

// app.js (o donde sea que crees app)

app.use(cors({
  origin: 'http://localhost:5173'  // Cambia a la URL y puerto donde corre tu frontend React
}));

app.use(express.json());
//coneccion a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lostbot_games'
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const [existingUser] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

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
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan credenciales' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];
    console.log('Contraseña enviada:', password);
    console.log('Contraseña en BD:', user.password);

    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      'tu_secreto_jwt',
      { expiresIn: '1h' }
    );

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


app.get('/games', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM juegos');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

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

app.get('/logros/:email', async (req, res) => {
  const email = req.params.email;
  console.log('Email recibido:', email);

  try {
    const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    console.log('Resultado consulta usuarios:', usuarios);

    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuarioId = usuarios[0].id;
    console.log('ID usuario:', usuarioId);

    const [logros] = await pool.query(
      `SELECT l.nombre, l.descripcion
       FROM usuario_logros ul
       JOIN logros l ON ul.logro_id = l.id
       WHERE ul.usuario_id = ?`,
      [usuarioId]
    );
    console.log('Logros encontrados:', logros);

    res.json(logros);
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
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
// aquí el resto de la configuración de app...
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

module.exports = app;


// aquí el resto de la configuración de app...
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

module.exports = app;
