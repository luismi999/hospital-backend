/* importamos el jsonwebtoken */
const jwt = require('jsonwebtoken')

/* creamos nuestra funcion de validar el jwt */
const validarJWT = ( req, res, next) => {
 
    /* leemos el token que nos mandan por el header */
    const token = req.header('x-token');

    /* si el token no es mandado mandamos el error pertinente en su json */
    if( !token ) {
        res.status(401).json({
            ok: false,
            msg: 'no hay token!'
        });
    }

    /* intentamos extraer el uid del token con verify */
    try {
        /* si el jwt se verifica significa que es correcto */
        const { uid } = jwt.verify( token, process.env.SECRET_KEY_JWT );
        console.log(uid);

        /* y colocamos el atributo de uid en el req que mandamos */
        req.uid = uid;
        /* y continuamos */
        next();
      /* si existe un error lo atrapamos y lo mandamos con su respectivo json   */
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'token invalido!'
        })
    }
}

/* exportamos nuestra funcion de validarJWT */
module.exports = {
    validarJWT
}