/* importamos el jwt */
const jwt = require('jsonwebtoken');

/* creamos la funcion para crear el jesonwebtoken mandanto para payload el uid*/
const crearJWT = ( uid ) => {
    /* retornamos una promesa  */
    return new Promise( ( resolve, reject) => {
        /* ponemos lo que queremos en nuestro payload de nuestro jwt */
        const payload = {
            uid
        };

        /* firmamos el jwt con el payload y una llave secreta */
        jwt.sign( payload, process.env.SECRET_KEY_JWT, 
            { 
                /* le decimos que expira en doce horas */
                expiresIn: '12h' 
            }, ( err, token ) => {
            /* si por alguna razon existe un error */
            if ( err ) {
                console.log(err);
                /* regresamos el error */
                reject( 'Algo salió mal con el JWT!' );
                /* de lo contrario resolvemos mandando el jwt */
            } else {
                resolve( token );
            }
        });
    });
}

/* exportamos nuestra funcion de crear jwt */
module.exports = {
    crearJWT
}