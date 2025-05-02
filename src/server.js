import app from './app.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3003;

const startServer = async () =>{
    console.log('Iniciando primer proceso, por favor espere.');
    await connectDB();
    console.log('Primer proceso terminado, iniciando servidor.');
    app.listen(PORT, () =>{
        console.log(`El servidor se a iniciado en el puerto ${PORT} exitosamente, puede continuar.`);   
    });
};

startServer();
