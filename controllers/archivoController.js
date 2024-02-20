import multer from "multer";
import shortid from "shortid";
import fs from 'fs'
import Enlace from "../models/Enlace.js";

const subirArchivo = async (req, res) => {

    const configMulter = {
        limits : {fileSize: req.usuario ? 1024*1024*10 : 1024*1024},
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads/')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            }
        })
    }
    
    const upload = multer(configMulter).single('archivo');

    upload(req, res, async(error) => {

        if(!error) {
            res.json({archivo: req.file.filename})
        } else {
            console.log(error);
            return
        }
    })
}

const eliminarArchivo = async (req, res) => {

    if(req.archivo) {

        try {
            fs.unlinkSync(`./uploads/${req.archivo}`)
        } catch (error) {
            console.log(error);
        }  
    }
}

const descargarArchivo = async (req, res, next) => {

    const {archivo} = req.params;

    const dir = './uploads/' + archivo;

    res.download(dir);

    const enlace = await Enlace.findOne({nombre: archivo});

    const {descargas, nombre} = enlace;

    if(descargas === 1) {
        req.archivo = nombre;
        await enlace.deleteOne();
    } else {
        enlace.descargas--;
        await enlace.save();
    }

    next();
}

export {
    subirArchivo,
    eliminarArchivo,
    descargarArchivo
}