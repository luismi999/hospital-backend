/* importamos mongoose  */
const mongoose = require('mongoose');

/* creamos nuestra funcion para conertarnos a la base de datos */
const dbConnection = async () => {
    /* intentamos conectar a la base de datos */
    try {
        /* hasta que se conecte a la base de datos que le mandamos como parametro la cual se encuentra en .env */
        await mongoose.connect(process.env.DB_CNN);
        /* si se conecta mostramos DB Online */
        console.log('DB Online');
      /* si hay algun error lo atrapamos */
    } catch (error) {
        /* mostramos el error */
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB');
    }
}

/* exportamos nuestra funcion dbConnection como un objeto solo llamando la instancia */
module.exports = {
    dbConnection
}