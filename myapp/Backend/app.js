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
  database: 'prueba'
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE correo = ? AND contraseña = ?',
      [email, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      const token = jwt.sign(
        { id: user.id, email: user.email },
        'tu_secreto_jwt', // Cambia esta clave por una más segura
        { expiresIn: '1h' }
      );

      res.json({ message: 'Login exitoso', token });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
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
