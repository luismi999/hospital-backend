/* 
RECORDAR QUE LA RUTA PRINCIPAL ES /API/USUARIOS 
*/

/* importamos el router que nos ayuda a las rutas de mongoose */
const { Router } = require('express');
/* importamos el check para checar los campos desde express-validator */
const { check } = require('express-validator');
/* importamos nuestro middleware personalizado para validar los campos */
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/* importamos las funciones get y post que se encuentran en nuestros controllers de usuario */
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');

/* creamos el router */
const router = Router();

/* 
creamos la ruta / para realizar el get de usuarios 
*/
router.get( '/', getUsuarios );

/* 
creamos la ruta / para el post de usuario 
*/
router.post( '/',[
    /* mandamos un arreglos de check y depues la funcion de validar campos de nuestro middleware */
    validarJWT,
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('email',"El email es obligatorio").isEmail(),
    check('password',"El password es obligatorio").not().isEmpty(),
    validarCampos
]
, crearUsuario );

/* 
creamos la ruta mandando el parametro ID para actualizar al usuario 
*/
router.put('/:id',[
    validarJWT,
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('email',"El email es obligatorio").isEmail(),
    check('role',"El role es obligatorio").not().isEmpty()
], actualizarUsuario);

/* 
creamos la ruta para eliminar usuarios 
*/
router.delete('/:id', validarJWT, eliminarUsuario );
/* exportamos el router para que pueda ser utilizado en otro lugar */
module.exports = router;