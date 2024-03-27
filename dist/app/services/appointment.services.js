"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Appointment_model_1 = __importDefault(require("../models/Appointment.model"));
const createAppointment = async (appointmentData) => {
    const appointment = new Appointment_model_1.default(appointmentData);
    return await appointment.save();
};
const getAllAppointments = async () => {
    return await Appointment_model_1.default.find();
};
const getAppointmentById = async (appointmentId) => {
    try {
        const appointment = await Appointment_model_1.default.find({
            userId: appointmentId,
        }).exec();
        return appointment || null;
    }
    catch (error) {
        console.error(`Error fetching appointment by ID ${appointmentId}:`, error);
        throw new Error("Failed to fetch appointment");
    }
};
const updateAppointment = async (appointmentId, updateData) => {
    return await Appointment_model_1.default.findByIdAndUpdate(appointmentId, updateData, {
        new: true,
    });
};
const deleteAppointment = async (appointmentId) => {
    return await Appointment_model_1.default.findByIdAndDelete(appointmentId);
};
const appointmentServices = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};
exports.default = appointmentServices;
