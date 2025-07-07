import Staff from '../models/staff.js';
import Appointment from '../models/appointment.js';
import mongoose from 'mongoose';
import { startOfDay, endOfDay } from "date-fns"; 

// Ruta para obtener todas las citas del admin
export const getAllAppointments = async (request, response) => {
  try {
    // 1. Verificar si el usuario es admin
    if (request.user.role !== 'admin') {
      return response.status(403).json({ message: "Acceso denegado: Se requiere rol de administrador" });
    }

    // 2. Buscar todas las citas (con datos del doctor asignado si existe)
    const appointments = await Appointment.find()
      .populate('assignedDoctor', 'name lastName email -_id') // -_id excluye el ID
      .sort({ date: 1, time: 1 });

    response.status(200).json(appointments);

  } catch (error) {
    console.error("Error al obtener citas (Admin):", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener todo el personal médico
// Esta ruta es para que el admin pueda ver todos los doctores y administradores 
export const getAllStaff = async (request, response) => {
  try {
    const staff = await Staff.find();
    response.json(staff);
  } catch (error) {
    response.status(500).json({ message: "Error al obtener el personal médico" });
  }
};

// asignar un doctor a cada paciente o cita
export const assignDoctorToAppointment = async (request, response) => {
  try {
    
    console.log("appointmentId:", request.params.id);
    console.log("doctorId:", request.body.doctorId);
    const appointmentId = request.params.id; 
    
    const { doctorId } = request.body;
    console.log(doctorId) 
     

    if (!doctorId) {
      return response.status(400).json({ message: "DoctorId es requerido" });
    }
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return response.status(400).json({ error: "ID de doctor inválido" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { assignedDoctor: doctorId },
      { new: true }
    );

    if (!updated) {
      return response.status(404).json({ message: "Cita no encontrada" });
    }

    return response.status(200).json({ message: "Doctor asignado exitosamente", appointment: updated });
  } catch (error) {
    console.error("Error asignando doctor:", error);
    return response.status(500).json({ message: "Error interno del servidor" });
  }
};
  
// Actualizar estado de una cita (Admin y doctores);
// controllers/appointmentController.js
export const updateAppointment = async (request, response) => {
  const { id } = request.params;
  const updates = request.body;

  const validStatuses = ["pendiente", "confirmada", "cancelada", "completada"];
  if (updates.status && !validStatuses.includes(updates.status)) {
    return response.status(400).json({ message: "Estado de cita inválido" });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedAppointment) {
      return response.status(404).json({ message: "Cita no encontrada" });
    }

    response.status(200).json(updatedAppointment);
  } catch (error) {
    response.status(500).json({ message: "Error al actualizar la cita", error });
  }
};
