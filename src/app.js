import express from "express";
import cors from "cors";
import dontev from "dotenv";
import userRoutes from "../src/routes/user.routes.js";

dontev.config(); //carga variables de entorno 

const app = express();

// middleware y rutas front
app.use(express.json());

app.use(cors({ 
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', //acepta solo las peticiones de nuestro front
    credentials: true, // permitira el uso de cookies para las autenticaciones
}));

// Rutas Bakcend
app.use('/api/users', userRoutes);


export default app;