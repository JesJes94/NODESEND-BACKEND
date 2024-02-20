import express from "express";
import { check } from "express-validator"
import checkAuth from "../middleware/authMiddleware.js";

import {
    nuevoUsuario,
    autenticarUsuario,
    obtenerUsuario
} from "../controllers/usuarioController.js"

const router = express.Router();

router.post('/',
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser de al menos 6 carácteres').isLength({min: 6})
    , nuevoUsuario);
router.route('/auth').
    post(
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La contraseña no puede ir vacía').not().isEmpty()       
    ,autenticarUsuario).
    get(checkAuth, obtenerUsuario)

export default router