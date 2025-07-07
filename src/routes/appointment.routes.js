import { Router } from "express";
import {
  createAppointment,   
} from "../controllers/appointmentController.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";

const router = Router();

// Crear una nueva cita
router.post("/", createAppointment);
 
export default router;
