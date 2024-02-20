import Enlace from "../models/Enlace.js"
import { validationResult } from "express-validator";
import shortid from "shortid";

const nuevoEnlace = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        res.status(400).json({errores: errores.array()});
    }

    const {nombre_original, nombre} = req.body;
    
    const enlace = new Enlace();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;

    //Si el usuario está autenticado;

    if(req.usuario) {
        const {password, descargas} = req.body;
        
        if(descargas) {
            enlace.descargas = descargas;
        }

        if(password) {
            enlace.password = password;
        }

        enlace.autor = req.usuario.id
    }

    try {
        await enlace.save();
        res.json({msg: `${enlace.url}`})
    } catch (error) {
        console.log(error);
    }
}

const obtenerEnlaces = async (req, res) => {
    try {
        const enlaces = await Enlace.find().select('url -_id')
        res.json({enlaces});
    } catch (error) {
        console.log(error)
    }
}

const obtenerEnlace = async (req, res, next) => {
    const {url} = req.params
    
    const enlace = await Enlace.findOne({url})
    
    if(!enlace) {
        const error = new Error('El enlace no existe');
        return res.status(400).json({msg: error.message});
    }

    if(enlace.password) {
        res.json({archivo: `${enlace.nombre}`, password: true})
    } else {
        res.json({archivo: `${enlace.nombre}`, password: false})
    }
}

const verificarPassword = async (req, res) => {
    const {url} = req.params

    const {password} = req.body;

    const enlace = await Enlace.findOne({url});

    if(!enlace) {
        const error = new Error('El enlace no existe');
        return res.status(400).json({msg: error.message});
    }

    if(await enlace.comprobarPassword(password)) {
        res.json({password: false})
    }
    else {
        const error = new Error('La contraseña es incorrecta');
        return res.status(401).json({msg: error.message})
    }

}

export {
    nuevoEnlace,
    obtenerEnlace,
    obtenerEnlaces,
    verificarPassword
}