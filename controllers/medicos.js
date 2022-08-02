const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async( req, res = response ) => {

    const medicos = await Medico.find().populate('usuario','nombre')
                                       .populate('hospital','nombre');

    res.json({
        ok: true,
        medicos
    })

}

const crearMedico = async( req, res = response ) => {

    const uid = req.uid;

    const { nombre, hospital } = req.body; 

    const medico = new Medico( { nombre, hospital, usuario: uid} ); 

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            smg: 'Habla con el administrador!'
        })
        
    }

}

const actualizarMedico = async ( req, res = response ) => {

    const { nombre, hospital } = req.body;
    const medicoId = req.params.id;

    try {

        const medicoBD = await Medico.findById( medicoId );
    
        if ( !medicoBD ) {
    
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado!'
            })
    
        }
    
        const cambiosMedico = {
            nombre,
            hospital,
            usuario: req.uid
        }
    
        const medicoActualizado = await Medico.findByIdAndUpdate( medicoId, cambiosMedico, { new: true } );
     

        res.json({
            ok: true,
            msg: 'Medico actualizado!',
            medicoActualizado
        })
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador!'
        })

    }

}

const eliminarMedico = async ( req, res = response ) => {

    const medicoId = req.params.id;

    try {
        
        const medicoBD = await Medico.findById( medicoId );
    
        if ( !medicoBD ) {
    
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado!'
            })
    
        }
    
        await Medico.findByIdAndDelete( medicoId );
     

        res.json({
            ok: true,
            msg: 'Medico Eliminado!'
        })
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador!'
        })

    }

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}