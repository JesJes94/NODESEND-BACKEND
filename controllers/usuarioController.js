import Usuario from "../models/Usuario.js"
import { validationResult } from "express-validator"
import generarJWT from "../helpers/generarJWT.js";

const nuevoUsuario = async (req, res) => {

    //Mostrar los errores de express-validator

    const errores = validationResult(req);

    if(!errores.isEmpty()) 
        return res.status(400).json({errores: errores.array()});

    const {email} = req.body;

    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario) {
        const error = new Error('El usuario ya está registrado');
        return res.status(400).json({msg: error.message})
    }

    const usuario = await new Usuario(req.body);

    usuario.save();
    res.json({msg: 'Usuario creado correctamente'});
}

const autenticarUsuario = async (req, res) => {

    const errores = validationResult(req);

    if(!errores.isEmpty()) 
        return res.status(400).json({errores: errores.array()});

    const {email, password} = req.body

    const existeUsuario = await Usuario.findOne({email});

    if(!existeUsuario) {
        const error = new Error('El usuario no existe');
        return res.status(401).json({msg: error.message});
    }

    if(await existeUsuario.comprobarPassword(password)) {
        const token = generarJWT(existeUsuario._id, existeUsuario.nombre, existeUsuario.email);
        res.json({token});
        
    } else {
        const error = new Error('La contraseña es incorrecta');
        return res.status(401).json({msg: error.message});
    }

}

const obtenerUsuario = async (req, res) => {
    res.json(req.usuario);
}

export {
    nuevoUsuario,
    autenticarUsuario,
    obtenerUsuario
}