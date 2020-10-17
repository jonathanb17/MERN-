//arrananmos el servidor nomas
//aca se importa la base,las configuracion de app.js
const app = require('./app');
require('./database')

app.listen(app.get('port'));
console.log('server on port',app.get('port'));