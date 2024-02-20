import jwt from "jsonwebtoken"

const checkAuth = async (req, res, next) => {

    const auth = req.get('Authorization');
    
    if(auth) {
        const token = auth.split(' ')[1];

        try {
            const usuario = jwt.verify(token, process.env.JWT_SECRET)
            req.usuario = usuario;
        } catch (error) {
            return res.status(403).json({msg: 'JWT no válido'});
        }
    }

    next();
}

export default checkAuth;