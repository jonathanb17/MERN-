//aca van os middeware,cosas asi

const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

//definimos la variable 'port' con el numero
app.set('port',4000);

//middeware
app.use(morgan('dev')); // escucha las petciones que le damos al servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//ruta




app.use('/api/employees',require('./routes/employees.routes'))


module.exports=app;