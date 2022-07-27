const { response } = require("express");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const { actualizarImagen } = require("../helpers/actualizar.imagen");

const fileUpload = ( req, res =response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    /* Validar tipo */
    const tiposValidos = ['usuarios','medicos','hospitales'];
    if ( !tiposValidos.includes( tipo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'Tipo no valido: usuarios/medicos/hospitales'
        })
    }

    /* Validar que exista alguna imagen*/
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false, 
            msg: 'No se recibio ningun archivo!'
        });
    }

    /* procesar la imagen... */
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    /* validar Extension */
    const extensionesValidas = ['jpg','png','gif'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'Tipo de archivo valido: jpg,png,gif'
        })
    }

   /*  Generar un nombre al archivo */
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

   /* Path para guardar la imagen */
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    /* Mover la imagen */
    /* Use the mv() method to place the file somewhere on your server */
    file.mv(path, (err) => {
      if (err) {
        console.log(err);
          return res.status(500).json({
            ok: false,
            msg: 'Error al mover la imagen'
          });
      }
      res.json({
          ok: true,
          msg: 'Archivo subido!',
          nombreArchivo
      })
    });

    /* actualizar imagen a BD */
    actualizarImagen( id, tipo, nombreArchivo );
}


const obtenerImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto   = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    /* imagen por defecto */
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    }else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    obtenerImagen
}