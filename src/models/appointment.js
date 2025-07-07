// models/appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  ci: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pendiente", "confirmada", "cancelada", "completada"],
    default: "pendiente"
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff", // Relación con el modelo Staff (doctores/administradores)
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
