import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
     },

     nombre: {
        type: String,
        require: true,
        trim: true
     },

     password: {
        type: String,
        require: true,
        trim: true
     }

})

usuarioSchema.pre('save', async function(next) {

   if(!this.isModified('password'))
      next();

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
})

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
   return await bcrypt.compare(passwordFormulario, this.password);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;