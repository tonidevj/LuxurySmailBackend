import express from 'express';
const userRoutes = express.Router();

userRoutes.post('/', (request, response) => {
    request.send("Funciona!");
});

 export default userRoutes;
 