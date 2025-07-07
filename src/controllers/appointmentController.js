// controllers/appointmentController.js
import Appointment from "../models/appointment.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { startOfDay, endOfDay } from "date-fns";
import Staff from "../models/staff.js";
// import { sendEmailNotification } from "../utils/emailService.js"; // si tienes una función para enviar correos

export const createAppointment = async (request, response) => {
  const { firstName, lastName, ci, email, date, time } = request.body;

  if (!firstName || !lastName || !ci || !email || !date || !time) {

    return response.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const newAppointment = new Appointment({
      firstName,
      lastName,
      ci,
      email,
      date,
      time,
      status: "pendiente"
    });

    await newAppointment.save();

    // Notificar por correo al admin y al paciente (opcional)
    // await sendEmailNotification(email, 'Cita solicitada', 'Tu cita ha sido registrada...');
    // await sendEmailNotification(ADMIN_EMAIL, 'Nueva cita solicitada', `El paciente ${firstName} ${lastName}...`);

    response.status(201).json({ message: "Cita registrada exitosamente", appointment: newAppointment });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error al registrar la cita" });
  }
};

 
 




 