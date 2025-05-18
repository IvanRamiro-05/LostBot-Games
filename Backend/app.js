// app.js (o donde sea que crees app)
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const mysql = require('mysql2');
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
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Cambia si tu usuario es diferente
  password: '',         // Cambia si tienes contraseña
  database: 'lostbot_games' // Cambia por el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

const SECRET_KEY = 'tu_clave_secreta'; // Usa una clave secreta segura

// Ruta de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  connection.query(
    'SELECT * FROM usuarios WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error en la base de datos' });
      if (results.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

      // Generar token JWT
      const user = results[0];
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '2h' });

      res.json({ success: true, token, user: { id: user.id, email: user.email, nombre: user.nombre } });
    }
  );
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
