import { Router } from "express";
import { getAllStaff,
         assignDoctorToAppointment,
         getAllAppointments,
         updateAppointment, } from "../controllers/adminAppointmentsController.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { adminOnly, staffOnly } from "../middlewares/staffOnly.js"; 

const router = Router();

// Ruta para obtener todas las citas del admin
router.get('/Allappointments', authenticateJWT, adminOnly, getAllAppointments);

// Ruta para obtener todos los doctores
router.get('/getDoctors', authenticateJWT, adminOnly ,getAllStaff);

// Ruta para asignar un doctor a una cita
router.put('/:id/assign-doctor', authenticateJWT, adminOnly, assignDoctorToAppointment );

// ruta para actualizar el estado de una cita
router.put('/:id/updateStatus', authenticateJWT, staffOnly, updateAppointment);

export default router; 