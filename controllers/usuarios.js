/* importamos response para tener un tipado en resp */
const { response } = require('express');
/* importamos bcrypt para poder encriptar nuestra contraseña */
const bcrypt = require('bcryptjs');
/* importamos nuestro modelo Usuario */
const Usuario = require( '../models/usuario' );
const { crearJWT } = require('../helpers/jwt');

/* creamos nuestra funcion get para obtener usuarios de nuestra BD */
const getUsuarios = async ( req, res = response ) => {
    /* buscamos todos los usuarios, solo extrayendo nombre, email, role y google */

    const desde = req.query.desde;

    const [ usuarios, total ] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
                                  .skip( desde )
                                  .limit( 5 ),
        Usuario.count()
    ])

    const uid = req.uid;
    /* regresamos la respuesta como un objeto json */
    res.json( {
        ok: true,
        usuarios,
        uid,
        total
    } );
}

/* creamos nuestra funcion para crear usuarios */
const crearUsuario = async ( req, res = response ) => {
    /* desestructuramos el objeto de req.body */
    const { email, password } = req.body;
    /* intentamos encontrar un usuario con el email  */
    try {
        /* tratamos de encontrar un email existente en nuestra bd, en este caso solo el campo de email */
        const correoExistente = await Usuario.findOne({ email });
        /* si encontramos un correo igual en la bd retornamos una respuesta */
        if( correoExistente ) {
           /*  retornamos un status 400 y un objeto json */
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya habia sido registrado anteriormente  !'
            })
        }

        /* crear una nueva instancia de Usuario */
        const usuario = new Usuario( req.body );
        
        /* encriptar contraseña */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        /* guardar usuario */
        await usuario.save();

        /*  creacion de un JWT */
        const token = await crearJWT( usuario.id );

        /* regresamos un objeto json  */
        res.json( {
            ok: true,
            usuario,
            token
        } );
      /* si hay un error lo atrapamos */
    } catch (error) {
        /* retornamos un objeto json con el estatus 500 y el error pertinente */
        console.log(error);
        res.status(500).json( {
            ok: false,
            msg: 'Error inesperado... revisar logs!'
        } );  
    }
}

/* creamos nuestra funcion para actualizar el usuario */
const actualizarUsuario = async (req, res = response) => {
    /* obtenemos el id del parametro que mandamos en el url */
    const uid = req.params.id;

    /* TODO: hacer un autenticacion por JWT */

    /* intentamos buscar el usuario por medio del id */
    try {
        /* buscamos el usuario con el id que mandamos por parametro */
        const usuarioDb = await Usuario.findById( uid );
        /* si no encontramos el usuario en la bd */
        if( !usuarioDb ) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por tal id'
            })
        }
        /* desestructuramos el objeto que viene en req.body y sacamos por separado pass,goo,email y los demas los dejamos como campos */
        const { password, google, email, ...campos } = req.body;
        /* Si el usuario encontrado tiene diferente email que el que estamos mandando en el body */
        if( usuarioDb.email !== email ) {
            /* verificamos nuevamente que el email no pertenesca a ningun otro usuario */
            const emailExistente = await Usuario.findOne({ email });
            /* si el email ya existe mandamos el error */
            if( emailExistente ) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Correo ya existente!'
                })
            }
        }

        /* añadimos a campos el atributo de email */
        campos.email = email;
        /* esperamos a que actualice al usuario buscando por ID y actualizando al usuario */
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );
       /* retornamos respuesta positiva */
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

      /* si existe algun error lo atrapamos */
    } catch (error) {
        console.log(error);
        /* y mandamos el respectivo json con el objeto de error */
        res.status(5000).json({
            ok: false,
            smg: "Errro inesperado... revisar logs"
        })
    }
}

/* creamos la funcion para eliminar al usuario */
/* NOTA: en el dia a dia no queremos eliminar al usuario, más bien ponerle un estado de inactivo */
const eliminarUsuario = async ( req, res = response) => {

    /* tomamos el id que viene como parametro en el body del req */
    const uid = req.params.id;

    /* intentamos encontrar al usuario en la bd */
    try {
        /* buscamos al usuario por id en la base de dato */
        const usuarioDb = await Usuario.findById( uid );
        /* si no encontramos a dicho usuario mandamos un error en nuestro json */
        if( !usuarioDb ) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por tal id'
            })
        }
        /* en dado caso de que si se encuentre al usuario lo eliminamos, mandando el id a eliminar */
        await Usuario.findByIdAndDelete( uid );
        /*mandamos la respectiva respuesta de confirmacion de la eliminacion*/
        res.json({
            ok: true,
            msg: 'Usuario eliminado!'
        })
      /* si existe algun error lo atrapamos  */
    } catch (error) {
        /* mostramos el estaus del error en su respectivo json */
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

/* exportamos las funciones de usuario para que sean utilizadas en la ruta de usuario */
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}