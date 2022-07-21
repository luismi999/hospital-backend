
/* 
Recordar que este es un middleware personalizado 
*/

/* importamos el response de express */
const { response } = require('express');
/* importamos el validationresult de express validator esto para checar el resultado de los middlewares*/
const { validationResult } = require('express-validator');
/* creamos nuestra funcion de validar campos */
const validarCampos = ( req, res = response, next) => {
    /* obtenemos los errores de los middlewares de los campos */
    const errores = validationResult( req );
    /* si existen errores mandamos el error con su respectivo json */
    if( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
    }
    /* si no existen errores entonces continuamos con un next */
    next();
}

/* exportamos la funcion de validar campo como un objeto */
module.exports = {
    validarCampos
}