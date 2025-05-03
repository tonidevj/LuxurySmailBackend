// Controladores
import { registerUser,
        sendVerificationEmail,
        loginUser,
        verifyUser } from "../services/authService.js";

export const register = async (request, response, next) => {
    try {
        // primero crearemos el usuario
        const newUser = await registerUser(request.body);

        // 2.- ahora enviamos la verifycacion del email
        const verificationToken = await sendVerificationEmail(newUser);
        
        // 3 respondeos con exito al front
        response.status(201).json({
            message: 'Registro exitoso. revise su correo para verificar su cuenta.',
            data: {
                id: newUser.id,
                email: newUser.email,
                verificationToken
            }
        });
    } catch (error){
        next(error);
    }
} 

export const login = async (request, response, next) => {
    try {
      const { email, password } = request.body;
      const { token, role, name } = await loginUser(email, password);
  
      response.status(200).json({
        message: 'Inicio de sesión exitoso',
        data: { token, role, name }
      });
    } catch (error) {
      next(error);
    }
  };

export const verify = async (request, response, next) => {
    try{
        const { id, token } = request.params;
        const result = await verifyUser(id, token);
        response.status(200).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  };