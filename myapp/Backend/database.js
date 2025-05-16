//config/database
require('dotenv').config();
const {Sequelize} = require('sequelize');

//crear la conexión a la base de datos
const sequelize = new Sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
});

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
    return sequelize;
}
module.exports = {sequelize};
