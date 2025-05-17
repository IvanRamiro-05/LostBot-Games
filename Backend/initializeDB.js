const { sequelize } = require('./database');

const initDB = async () => {
    try {
        await sequelize.query('CREATE DATABASE IF NOT EXISTS prueba');
        await sequelize.query('USE prueba');

        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS users (
                nombre VARCHAR(255) NOT NULL,
                correo VARCHAR(255) NOT NULL,
                contraseña VARCHAR(255) NOT NULL,
                PRIMARY KEY (correo)
            )`);

        const usuarios = [
            { nombre: 'pruebas', correo: 'prueba@gmail.com', contraseña: 'prueba' },
            { nombre: 'Alejandro', correo: 'alejandro@gmail.com', contraseña: 'ale123' },
            { nombre: 'Maria', correo: 'maria@gmail.com', contraseña: 'maria456' },
            { nombre: 'Carlos', correo: 'carlos@gmail.com', contraseña: 'carlos789' },
            { nombre: 'Laura', correo: 'laura@gmail.com', contraseña: 'laura000' }
        ];

        for (const user of usuarios) {
            const [results] = await sequelize.query(
                `SELECT COUNT(*) as count FROM users WHERE correo = ?`,
                { replacements: [user.correo] }
            );

            if (results[0].count === 0) {
                await sequelize.query(
                    `INSERT INTO users (nombre, correo, contraseña) VALUES (?, ?, ?)`,
                    {
                        replacements: [user.nombre, user.correo, user.contraseña]
                    }
                );
            }
        }

    } catch (error) {
        console.error('Error initializing the database:', error);
    } finally {
        await sequelize.close();
    }
};

module.exports = initDB;
