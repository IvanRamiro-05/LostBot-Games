const { sequelize } = require('./database');

const initDB = async () => {
    try {
        await sequelize.query('CREATE DATABASE IF NOT EXISTS lostbot_games');
        await sequelize.query('USE lostbot_games');

        // Crear tablas
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT NOT NULL AUTO_INCREMENT,
                email VARCHAR(100) NOT NULL UNIQUE,
                nombre VARCHAR(100),
                password VARCHAR(255) NOT NULL,
                PRIMARY KEY (id)
            )
        `);

        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS juegos (
                id INT NOT NULL AUTO_INCREMENT,
                titulo VARCHAR(100) NOT NULL,
                precio DECIMAL(10,2) NOT NULL,
                PRIMARY KEY (id)
            )
        `);

        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS logros (
                id INT NOT NULL AUTO_INCREMENT,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT,
                PRIMARY KEY (id)
            )
        `);

        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS biblioteca (
                id INT NOT NULL AUTO_INCREMENT,
                usuario_id INT NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
            )
        `);

        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS biblioteca_juegos (
                biblioteca_id INT NOT NULL,
                juego_id INT NOT NULL,
                PRIMARY KEY (biblioteca_id, juego_id),
                FOREIGN KEY (biblioteca_id) REFERENCES biblioteca(id),
                FOREIGN KEY (juego_id) REFERENCES juegos(id)
            )
        `);

        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS usuario_logros (
                usuario_id INT NOT NULL,
                logro_id INT NOT NULL,
                PRIMARY KEY (usuario_id, logro_id),
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                FOREIGN KEY (logro_id) REFERENCES logros(id)
            )
        `);

        // Insertar datos
        const usuarios = [
            [1, 'alice@example.com', 'Alice', 'password1'],
            [2, 'bob@example.com', 'Bob', 'password2'],
            [3, 'carol@example.com', 'Carol', 'password3']
        ];

        for (const u of usuarios) {
            await sequelize.query(
                `INSERT IGNORE INTO usuarios (id, email, nombre, password) VALUES (?, ?, ?, ?)`,
                { replacements: u }
            );
        }

        const juegos = [
            [1, 'Stardew Valley', 7.49],
            [2, 'Dark Souls III', 29.99],
            [3, 'Sekiro: Shadows Die Twice', 59.99],
            [4, "Marvel's Spider-Man 2", 69.99],
            [5, 'Overwatch', 19.99],
            [6, 'Cyberpunk 2077', 49.99],
            [7, 'Hades', 24.99],
            [8, 'God of War', 39.99]
        ];

        for (const j of juegos) {
            await sequelize.query(
                `INSERT IGNORE INTO juegos (id, titulo, precio) VALUES (?, ?, ?)`,
                { replacements: j }
            );
        }

        const logros = [
            [1, 'Primer Juego', 'Has añadido tu primer juego a la biblioteca'],
            [2, 'Maestro de Logros', 'Has conseguido todos los logros de un juego'],
            [3, 'Maratón', 'Has jugado más de 100 horas'],
            [4, 'Coleccionista', 'Tienes más de 5 juegos en tu biblioteca']
        ];

        for (const l of logros) {
            await sequelize.query(
                `INSERT IGNORE INTO logros (id, nombre, descripcion) VALUES (?, ?, ?)`,
                { replacements: l }
            );
        }

        const bibliotecas = [
            [1, 1],
            [2, 2],
            [3, 3]
        ];

        for (const b of bibliotecas) {
            await sequelize.query(
                `INSERT IGNORE INTO biblioteca (id, usuario_id) VALUES (?, ?)`,
                { replacements: b }
            );
        }

        const bibliotecaJuegos = [
            [1, 1], [1, 7], [1, 8],
            [2, 2], [2, 3], [2, 5],
            [3, 4], [3, 6]
        ];

        for (const bj of bibliotecaJuegos) {
            await sequelize.query(
                `INSERT IGNORE INTO biblioteca_juegos (biblioteca_id, juego_id) VALUES (?, ?)`,
                { replacements: bj }
            );
        }

        const usuarioLogros = [
            [1, 1], [1, 4],
            [2, 3],
            [3, 1], [3, 2]
        ];

        for (const ul of usuarioLogros) {
            await sequelize.query(
                `INSERT IGNORE INTO usuario_logros (usuario_id, logro_id) VALUES (?, ?)`,
                { replacements: ul }
            );
        }

        console.log("Base de datos inicializada correctamente.");
    } catch (error) {
        console.error('Error initializing the database:', error);
    } finally {
        await sequelize.close();
    }
};


module.exports = initDB;
