const app = require('./app');
const initDB=require('./initializeDB');
require('./database');
initDB();

async function main(){
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();