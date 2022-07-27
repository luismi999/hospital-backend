const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        /* borrar la imagen anterior */
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async ( id, tipo, nombreArchivo ) => {

    switch ( tipo ) {
        case 'usuarios':

            const usuario = await Usuario.findById( id );

            if ( !usuario ) {
                console.log('No es un ID de usuario');
                return false;
            }

            const pathViejoUsuario = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejoUsuario );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        
        break;
        case 'medicos':

            const medico = await Medico.findById( id );

            if ( !medico ) {
                console.log('No es un ID de medico');
                return false;
            }

            const pathViejoMedico = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejoMedico );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        case 'hospitales':

            const hospital = await Hospital.findById( id );

            if ( !hospital ) {
                console.log('No es un ID de hospital');
                return false;
            }

            const pathViejoHospital = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejoHospital );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
        break;
    }

}

module.exports = {
    actualizarImagen
}