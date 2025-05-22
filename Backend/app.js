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


app.get('/games', (req, res) => {
  connection.query('SELECT * FROM juegos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    res.json(results);
  });
});

app.get('/users/:id/library', (req, res) => {
  const userId = req.params.id;
  const sql = `
    SELECT juegos.* FROM juegos
    JOIN biblioteca_juegos ON juegos.id = biblioteca_juegos.juego_id
    JOIN biblioteca ON biblioteca_juegos.biblioteca_id = biblioteca.id
    WHERE biblioteca.usuario_id = ?
  `;
  connection.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    res.json(results);
  });
});

app.get('/users/:id/achievements', (req, res) => {
  const userId = req.params.id;
  const sql = `
    SELECT logros.* FROM logros
    JOIN usuario_logros ON logros.id = usuario_logros.logro_id
    WHERE usuario_logros.usuario_id = ?
  `;
  connection.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    res.json(results);
  });
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
