/* 
RECORDAR QUE LA RUTA PRINCIPAL ES /API/MEDICOS 
*/

/* importamos el router que nos ayuda a las rutas de mongoose */
const { Router } = require('express');
/* importamos el check para checar los campos desde express-validator */
const { check } = require('express-validator');
/* importamos nuestro middleware personalizado para validar los campos */
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/* importamos las funciones get y post que se encuentran en nuestros controllers de medicos */
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');

/* creamos el router */
const router = Router();

/* 
creamos la ruta / para realizar el get de medicos
*/
router.get( '/' , getMedicos );

/* 
creamos la ruta / para el post de medico 
*/
router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('hospital', 'El hospital ID debe de ser valido!').isMongoId(),
    validarCampos
], crearMedico );

/* 
creamos la ruta mandando el parametro ID para actualizar al medico 
*/
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre del medico es necesario').not().isEmpty(),
    check('hospital','El hospital tiene que ser valido').isMongoId(),
    validarCampos
], actualizarMedico);

/* 
creamos la ruta para eliminar medico 
*/
router.delete('/:id', eliminarMedico );
/* exportamos el router para que pueda ser utilizado en otro lugar */
module.exports = router;