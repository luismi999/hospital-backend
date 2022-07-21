/* importamos Schema y model para poder utilizarlos, esta es una herramienta de mongoose */
const { Schema, model } = require('mongoose');

/* creamos el esquema del usuario */
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }

})

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object; 
})

/* exportamos el modelo del usuario */
module.exports = model( 'Usuario', UsuarioSchema );