const jwt = require('jsonwebtoken');

const crearJWT = ( uid ) => {
    
    return new Promise( ( resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign( payload, process.env.SECRET_KEY_JWT, 
            { 
                expiresIn: '12h' 
            }, ( err, token ) => {
        
            if ( err ) {
                console.log(err);
                reject( 'Algo salió mal con el JWT!' );
            } else {
                resolve( token );
            }

        });
    });
}

module.exports = {
    crearJWT
}