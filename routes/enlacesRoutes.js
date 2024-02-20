import express from "express";
import { check } from "express-validator";
import checkAuth from "../middleware/authMiddleware.js";

import {
    nuevoEnlace,
    obtenerEnlace,
    obtenerEnlaces,
    verificarPassword
} from "../controllers/enlaceController.js"

const router = express.Router();

router.route('/')
        .get(obtenerEnlaces)
        .post(
            check('nombre', 'Sube un archivo').not().isEmpty(),
            check('nombre_original', 'Sube un archivo').not().isEmpty(),
            checkAuth, nuevoEnlace);
router.route('/:url')
        .get(obtenerEnlace)
        .post(verificarPassword);

export default router;
