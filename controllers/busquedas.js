const { response } = require("express");

const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const Usuario = require("../models/usuario");


const getTodo = async( req, res = response ) => {

    const busqueda = await req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ])

    try {
        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        })      
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador!'
        }) 
    }
}

const getDocumentoColeccion = async( req, res = response ) => {

    const tabla = await req.params.tabla;
    const busqueda = await req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'usuario':
            data = await Usuario.find({ nombre: regex });
            break;

        case 'medico':
            data = await Medico.find({ nombre: regex }).populate('usuario','nombre img')
                                                       .populate('hospital','nombre img');
            break;

        case 'hospital':
            data = await Hospital.find({ nombre: regex }).populate('usuario','nombre img');
            break;
    
        default:
            return res.status(400).json({ 
                ok:false,
                msg: 'el path debe de ser: usuario/medico/hospital'
             })
    }

    res.json({
        ok:true,
        resultado: data
    })

}

module.exports = {
    getTodo,
    getDocumentoColeccion
}