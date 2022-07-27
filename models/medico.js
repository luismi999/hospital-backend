/* importamos Schema y model para poder utilizarlos, esta es una herramienta de mongoose */
const { Schema, model } = require('mongoose');

/* creamos el esquema del medico */
const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
},{ collection: 'medicos' })

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object; 
})

/* exportamos el modelo del medico */
module.exports = model( 'Medico', MedicoSchema );