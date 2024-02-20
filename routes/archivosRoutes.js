import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
    subirArchivo,
    descargarArchivo,
    eliminarArchivo
} from "../controllers/archivoController.js"

const router = express.Router();

router.post('/', checkAuth, subirArchivo);
router.get('/:archivo', descargarArchivo, eliminarArchivo); 


export default router;