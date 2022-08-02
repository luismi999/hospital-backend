/* importamos el response */
const { response } = require( 'express' );
const bcrypt = require('bcryptjs');
/* importamos nuestro objeto Usuario */
const Usuario = require( '../models/usuario' );
const { crearJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google.verify'); 
 
/* creamos la funcion de login */
const login =  async ( req, res = response ) => {
    /* desestructuramos el body de nuestro req */
    const { email, password } = req.body;

    /* intentamos buscar un usuario con dicho email y contraseña */
    try {

        /* 
        validamos el email 
        */

        /* esperamos a encontrar un usuario con el email proporcionado */
        const usuarioDB = await Usuario.findOne({email});
        /* si no encontramos un usuario con el email entonces mandamos el error con su respectivo json */
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email invalido!'
            });
        }

        /* 
        validamos el password 
        */

        /* comparamos las contraseñas  */
        const passValid = bcrypt.compareSync( password, usuarioDB.password );
        /* si las contraseñas no son iguales mandamos el error con su respectivo json */
        if( !passValid ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña invalida!'
            });
        }

        /* creamos nuestro json web token de nuestro helper mandando el uid del login */
        const token = await crearJWT( usuarioDB.id );
        /* mandamos la respuesta de que todo salio correcto */
        res.json({
            ok: true,
            token
        })
      /* si existe algun error lo atrapamos y mostramos el respectivo error */
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Habla con el administrador'
        })
    }
}

const googleSignIn = async( req, res = response ) => {

    
    try {

        const { email, name, picture } = await googleVerify( req.body.token );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {

            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

        }else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        /* Guardar usuario */
        await usuario.save();

        /* creamos el jwt */
         const token = await crearJWT( usuario.id );

        res.json({
            ok: true,
            name, email, picture,
            token
        })
        
    } catch (error) {
        
        response.status(400).json({
            ok: false,
            msg: 'Hable con el administrador!'
        })

    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    /* creamos el jwt */
    const token = await crearJWT( uid );

    res.json({
        ok: true,
        token
    })

}

/* exportamos nuestra funcion de login */
module.exports = {
    login,
    googleSignIn,
    renewToken
}