import bcrypt from 'bcrypt'; //encriptar las claves de los doctores o administradores.
import jwt from 'jsonwebtoken'; //Con esto generaremos y verificaremos tokens JWT.
import Staff from '../models/staff.js'; //importamos nuestro modelo de staff (Personal), aministradores y odontologos.
import nodemailer from 'nodemailer'; // Con esto envaremos los emails.
import { 
    PAGE_URL,
    JWT_SECRET,
    EMAIL_USER,
    EMAIL_PASS, 
    VERIF_TOKEN_EXPIRES,
    SESSION_TOKEN_EXPIRES } from '../config.js';

    // registerUser(data)
    // Crea un nuevo usuario de tipo Staff (doctor/admin) tras validar y encriptar su contraseña.
    // Verifica unicidad de email.
    // Hashea la contraseña. 
export const registerUser = async (data) => {
    const {
        name,
        lastName,
        numberId,
        address,
        numberPhone,
        birthday,
        sex,
        specialty,
        email,
        password
    } = data;
    if( !name ||
        !lastName || 
        !numberPhone || 
        !email || 
        !address || 
        !numberId || 
        !birthday || 
        !sex || 
        !password){
            throw new Error('Todos los campos son obligatorios');
        }

        const emailExist = await Staff.findOne({ email }); 
        if(emailExist){ 
            throw new Error('El correo ya se encuentra en uso');
          } 

        const passwordHash = await bcrypt.hash(password, 10);
          
        // crea el nuevo Staff o usuario
        const newUser = new Staff({
            name,
            lastName,
            numberId,
            address,
            numberPhone,
            birthday,
            sex,
            specialty,
            email,
            passwordHash
          });

        //   guardamos en Mongo
          await newUser.save();
          return newUser;
}

// sendVerificationEmail(user).
// crea el JWT de la verificacion.
// hace la verificacion para el frontend.
// envia email al usuario.
 
export const sendVerificationEmail = async (user) => {
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: VERIF_TOKEN_EXPIRES });
    const link = `${PAGE_URL}/verify/${user.id}/${token}`;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        },
        tls: { rejectUnauthorized: false }
    });
    await transporter.sendMail({
        from: EMAIL_USER,
        to: user.email,
        subject: 'verificacion de correo',
        html:`
        <p> Hola ${user.name}, </p>
        <p>Haz click en el enlace para verificar tu cuenta en Luxury Smail (válido 1h):</p>
        <a href="${link}">${link}</a>
      `
    });
    return token;
}

// verifyUser(id, token)
// Verificara el token, comprobara que el id coincida y marcara el campoverified en la base de Mongo

export const verifyUser = async (id, token) => {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.id !== id) {
        throw new Error('Token de verificacion invalido');
    }
    await Staff.findByIdAndUpdate(id, {verified: true});
}

// loginUser, busca usuario por email y compara claves
// Asegura que el correo este verificado y genera un JWT de sesion de 2h

export const loginUser = async(email, password) =>{
    // 1.- primero buscamos el usuario, el usuario es el correo.
    const user = await Staff.findOne({ email });
    if(!user){
        throw new Error('Email invalido');
    }
    //  2.- validamos la clave.
    const valid = await bcrypt.compare(password, user.passwordHash);
    if(!valid){
        throw new Error('Clave invalida');
    }

    // 3.- verificamos que el mail esta confirmado.
    if(!user.verified){
        throw new Error('Debes verificar tu correo antes de iniciar sesion');
    }

    // 4.- generamos token de sesion
    const token = jwt.sign(
        {id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: SESSION_TOKEN_EXPIRES}
    );
    
    return{ token, role: user.role, name: user.name};
};