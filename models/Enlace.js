import mongoose from "mongoose";
import bcrypt from "bcrypt";

const enlaceSchema = mongoose.Schema({
    url: {
        type: String,
        require: true
    },

    nombre: {
        type: String,
        require: true
    },

    nombre_original: {
        type: String,
        require: true
    },

    descargas: {
        type: Number,
        default: 1
    },

    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },

    password: {
        type: String
    },

    creado: {
        type: Date,
        default: Date.now()
    }
})

enlaceSchema.pre('save', async function(next) {

    if(!this.isModified('password'))
        next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

enlaceSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Enlace = mongoose.model('Enlaces', enlaceSchema);

export default Enlace;