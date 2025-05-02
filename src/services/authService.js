import bcrypt from 'bcrypt'; //encriptar las claves de los doctores o administradores.
import jwt from 'jsonwebtoken'; //Con esto generaremos y verificaremos tokens JWT.
import Staff from '../models/staff.js'; //importamos nuestro modelo de staff (Personal), aministradores y odontologos.
import nodemailer from 'nodemailer'; // Con esto envaremos los emails.
import { 
    PAGE_URL,
    JWT_SECRET,
    EMAIL_USER,
    EMAIL_PASS } from '../config.js';



