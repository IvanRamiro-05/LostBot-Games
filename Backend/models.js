const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('lostbot_games', 'root', '', {
  host: 'localhost',
  port: 3306, // Cambia si tu MySQL usa otro puerto
  dialect: 'mysql'
});

// Usuario
const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  nombre: { type: DataTypes.STRING(100) },
  password: { type: DataTypes.STRING(255), allowNull: false }
}, { tableName: 'usuarios', timestamps: false });

// Biblioteca
const Biblioteca = sequelize.define('Biblioteca', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'biblioteca', timestamps: false });

// Juego
const Juego = sequelize.define('Juego', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING(100), allowNull: false },
  precio: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, { tableName: 'juegos', timestamps: false });

// Biblioteca_Juegos (tabla intermedia)
const BibliotecaJuegos = sequelize.define('BibliotecaJuegos', {
  biblioteca_id: { type: DataTypes.INTEGER, primaryKey: true },
  juego_id: { type: DataTypes.INTEGER, primaryKey: true }
}, { tableName: 'biblioteca_juegos', timestamps: false });

// Logro
const Logro = sequelize.define('Logro', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  descripcion: { type: DataTypes.TEXT }
}, { tableName: 'logros', timestamps: false });

// Usuario_Logros (tabla intermedia)
const UsuarioLogros = sequelize.define('UsuarioLogros', {
  usuario_id: { type: DataTypes.INTEGER, primaryKey: true },
  logro_id: { type: DataTypes.INTEGER, primaryKey: true }
}, { tableName: 'usuario_logros', timestamps: false });

// Relaciones
Usuario.hasOne(Biblioteca, { foreignKey: 'usuario_id' });
Biblioteca.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Biblioteca.belongsToMany(Juego, {
  through: BibliotecaJuegos,
  foreignKey: 'biblioteca_id',
  otherKey: 'juego_id'
});
Juego.belongsToMany(Biblioteca, {
  through: BibliotecaJuegos,
  foreignKey: 'juego_id',
  otherKey: 'biblioteca_id'
});

Usuario.belongsToMany(Logro, {
  through: UsuarioLogros,
  foreignKey: 'usuario_id',
  otherKey: 'logro_id'
});
Logro.belongsToMany(Usuario, {
  through: UsuarioLogros,
  foreignKey: 'logro_id',
  otherKey: 'usuario_id'
});

module.exports = {
  sequelize,
  Usuario,
  Biblioteca,
  Juego,
  BibliotecaJuegos,
  Logro,
  UsuarioLogros
};