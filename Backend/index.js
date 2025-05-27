// Importa la configuración de la aplicación Express
const app = require('./app');

// Importa la función que inicializa la base de datos 
const initDB = require('./initializeDB');

// Ejecuta el archivo que configura la conexión a la base de datos
require('./database');

// Inicializa la base de datos 
initDB();

// Función principal asincrónica para iniciar el servidor
async function main() {
    // Espera a que el servidor escuche en el puerto especificado en app.js
    await app.listen(app.get('port'));


    console.log('Server on port', app.get('port'));
}


main();
