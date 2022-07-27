/* importamos Schema y model para poder utilizarlos, esta es una herramienta de mongoose */
const { Schema, model } = require('mongoose');

/* creamos el esquema del hospital */
const HospitalSchema = Schema({
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
        require: true
    }
},{ collection: 'hospitales' })

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object; 
})

/* exportamos el modelo del hospital */
module.exports = model( 'Hospital', HospitalSchema );