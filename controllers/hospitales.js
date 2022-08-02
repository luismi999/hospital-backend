const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async( req, res = response ) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario','nombre');

    res.json({
        ok: true,
        hospitales
    })

}

const crearHospital = async ( req, res = response ) => {

    const uid = req.uid;

    const hospital = new Hospital( { usuario: uid, ...req.body } );

    try {

        const hospitalDB = await hospital.save();

        res.json({
            hospital: hospitalDB
        })
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador!'
        })

    }
}

const actualizarHospital = async ( req, res = response ) => {

    const idHospital = req.params.id;

    const uid = req.uid;

    const hospitalBD = await Hospital.findById( idHospital );

    
    try {

        if( !hospitalBD ) {
    
            return res.status(404).json({
                ok: false, 
                msg: 'Hospital no encontrado!'
            })
    
        }
    
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
    
        const hospitalActualizado = await Hospital.findByIdAndUpdate( idHospital, cambiosHospital, { new: true });
        
        res.json({
            ok: true,
            msg: 'actualizarHospital',
            hospitalActualizado
        })

    } catch (error) {
        
        res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador!'
        })

    }


}

const eliminarHospital = async ( req, res = response ) => {

    const idHospital = req.params.id;
    const hospitalBD = await Hospital.findById( idHospital );
    
    try {

        if( !hospitalBD ) {
    
            return res.status(404).json({
                ok: false, 
                msg: 'Hospital no encontrado!'
            })
    
        }
    
        await Hospital.findByIdAndDelete( idHospital );
        
        res.json({
            ok: true,
            msg: 'Hospital eliminado!'
        })

    } catch (error) {
        
        res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador!'
        })

    }

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}