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

const actualizarMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })

}

const eliminarMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'eliminarMedico'
    })

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}