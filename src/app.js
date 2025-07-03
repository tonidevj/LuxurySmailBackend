import { errorHandler } from "./middlewares/errorhandler.js"; // importa el middleware
import express from "express";
import cors from "cors";
import dontev from "dotenv";
import userRoutes from "../src/routes/user.routes.js";
import authRoutes from "../src/routes/auth.js";
import cookieParser from "cookie-parser";

dontev.config(); //carga variables de entorno 

const app = express();

// middleware y rutas front
app.use(express.json());
app.use(cookieParser());

app.use(cors({ 
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', //acepta solo las peticiones de nuestro front
    credentials: true, // permitira el uso de cookies para las autenticaciones
}));

// Rutas Bakcend
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);
export default app; 