/* 
RECORDAR QUE LA RUTA PRINCIPAL ES /API/HOSPITALES 
*/

/* importamos el router que nos ayuda a las rutas de mongoose */
const { Router } = require('express');
/* importamos el check para checar los campos desde express-validator */
const { check } = require('express-validator');
/* importamos nuestro middleware personalizado para validar los campos */
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/* importamos las funciones get y post que se encuentran en nuestros controllers de hOSPITALES */
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales');

/* creamos el router */
const router = Router();

/* 
creamos la ruta / para realizar el get de hospitales
*/
router.get( '/' , getHospitales );

/* 
creamos la ruta / para el post de Hospital 
*/
router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio!').not().isEmpty(),
    validarCampos
], crearHospital );

/* 
creamos la ruta mandando el parametro ID para actualizar al Hospital 
*/
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre del hospital es obligatorio!').not().isEmpty(),
    validarCampos
], actualizarHospital);

/* 
creamos la ruta para eliminar Hospitals 
*/
router.delete('/:id', validarJWT, eliminarHospital );
/* exportamos el router para que pueda ser utilizado en otro lugar */
module.exports = router;