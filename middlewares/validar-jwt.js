const jwt = require('jsonwebtoken')

const validarJWT = ( req, res, next) => {
 
    const token = req.header('x-token');

    if( !token ) {
        
        res.status(401).json({
            ok: false,
            msg: 'no hay token!'
        });

    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_KEY_JWT );
        console.log(uid);

        req.uid = uid;
        next();
        
    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg: 'token invalido!'
        })

    }

}

module.exports = {
    validarJWT
}