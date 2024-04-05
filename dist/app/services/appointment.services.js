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
        const query = {
            $or: [{ userId: appointmentId }, { lawyerId: appointmentId }],
        };
        const appointment = await Appointment_model_1.default.find(query).exec();
        return appointment || null;
    }
    catch (error) {
        console.error(`Error fetching appointment by ID ${appointmentId}:`, error);
        throw new Error("Failed to fetch appointment");
    }
};
const updateAppointment = async (appointmentId, updateData) => {
    console.log("Id: ", appointmentId, " UpdateD: ", updateData);
    const query = await Appointment_model_1.default.findByIdAndUpdate(appointmentId, updateData, {
        new: true,
    });
    console.log(query);
    return query;
};
const deleteAppointment = async (appointmentId) => {
    return await Appointment_model_1.default.findByIdAndDelete(appointmentId);
};
const getRevew = async (lawyerId, page, limit) => {
    try {
        const skip = (page - 1) * limit;
        const query = await Appointment_model_1.default.find({ lawyerId })
            .select("rating comment userName userImg date time")
            .skip(skip)
            .limit(limit)
            .exec();
        return query;
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        throw new Error("Review not found");
    }
};
const totalNumberOfAppointment = async (id) => {
    try {
        const count = await Appointment_model_1.default.estimatedDocumentCount({ lawyerId: id });
        return count;
    }
    catch (error) {
        throw new Error("Failed to find total number of appointments");
    }
};
const appointmentServices = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    getRevew,
    totalNumberOfAppointment,
};
exports.default = appointmentServices;
