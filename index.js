require('dotenv').config();
    
/* importamos express para crear nuestro servidor */
const express = require('express');
/* importamos cors para configurarlos */
const cors = require('cors');
/* importamos dbConnection la cual viene de database, en donde conectamos la base de datos */
const { dbConnection } = require('./database/config');

//Creamos el servidor express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

//Realizamos la conexión a la base de datos 
dbConnection();

//Rutas

/* 
login 
*/
app.use( '/api/login', require( './routes/auth' ) );

/* 
usuarios
*/
app.use( '/api/usuarios', require( './routes/usuarios' ) );

/* 
hospitales 
*/
app.use( '/api/hospitales', require( './routes/hospitales' ) );

/* 
medicos 
*/
app.use( '/api/medicos', require( './routes/medicos' ) );

/* 
busquedas
*/
app.use( '/api/todo', require( './routes/busquedas' ) );

/* 
uploads
*/
app.use( '/api/upload', require( './routes/uploads' ) );

app.listen(process.env.PORT, () => {
    console.log('Servidor express corriendo en puerto ' + process.env.PORT);
})