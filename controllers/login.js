/* importamos el response */
const { response } = require( 'express' );
const bcrypt = require('bcryptjs');
/* importamos nuestro objeto Usuario */
const Usuario = require( '../models/usuario' );
const { crearJWT } = require('../helpers/jwt');
 
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

        const token = await crearJWT( usuarioDB.id );

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

module.exports = {
    login
}