/* 
ruta principal: api/busquedas  
*/
const { Router } = require('express');

const { getTodo, getDocumentoColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT, getTodo);

router.get('/:tabla/:busqueda', validarJWT, getDocumentoColeccion);

module.exports = router;