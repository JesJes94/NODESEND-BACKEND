import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import enlacesRoutes from "./routes/enlacesRoutes.js"
import archivosRoutes from "./routes/archivosRoutes.js"

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

//const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: process.env.FRONTEND_URL
}

app.use(cors(corsOptions));

const PORT = process.env.port || 4000;

app.use(express.static('uploads'));

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/enlaces', enlacesRoutes);
app.use('/api/archivos', archivosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
})