"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointment_services_1 = __importDefault(require("../services/appointment.services"));
const takeAnAppointment = async (req, res) => {
    try {
        const appointment = await appointment_services_1.default.createAppointment(req.body);
        res.status(201).json({
            status: "success",
            message: "Appointment created successfully",
            data: appointment,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to create appointment",
            error: error.message,
        });
    }
};
const getAppointments = async (req, res) => {
    try {
        const appointments = await appointment_services_1.default.getAllAppointments();
        res.status(200).json({
            status: "success",
            message: "Appointments fetched successfully",
            data: appointments,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch appointments",
            error: error.message,
        });
    }
};
const getAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params._id;
        const appointment = await appointment_services_1.default.getAppointmentById(appointmentId);
        if (!appointment) {
            res
                .status(404)
                .json({ status: "error", message: "Appointment not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Appointment fetched successfully",
            data: appointment,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch appointment",
            error: error.message,
        });
    }
};
const updateAppointment = async (req, res) => {
    try {
        const appointmentId = req.params._id;
        const updatedAppointment = await appointment_services_1.default.updateAppointment(appointmentId, req.body);
        if (!updatedAppointment) {
            res
                .status(404)
                .json({ status: "error", message: "Appointment not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Appointment updated successfully",
            data: updatedAppointment,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to update appointment",
            error: error.message,
        });
    }
};
const getAppointmentRevew = async (req, res) => {
    try {
        const lawyerId = req.params._id;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const revew = await appointment_services_1.default.getRevew(lawyerId, page, limit);
        if (!revew) {
            res
                .status(404)
                .json({ status: "error", message: "Appointment not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Appointment revew get successfully",
            data: revew,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to get revew appointment",
            error: error.message,
        });
    }
};
const deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params._id;
        const deletedAppointment = await appointment_services_1.default.deleteAppointment(appointmentId);
        if (!deletedAppointment) {
            res
                .status(404)
                .json({ status: "error", message: "Appointment not found" });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Appointment deleted successfully",
            data: deletedAppointment,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete appointment",
            error: error.message,
        });
    }
};
const getTotalNumberOfAppiontmentRevew = async (req, res) => {
    try {
        const lawyerId = req.params._id;
        const totalAppointment = await appointment_services_1.default.totalNumberOfAppointment(lawyerId);
        res.status(200).json({
            status: "success",
            message: "Successfully get total number of appointment",
            data: totalAppointment,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve total number of appointment.",
            error: error.message,
        });
    }
};
const appointmentController = {
    takeAnAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    getAppointmentRevew,
    getTotalNumberOfAppiontmentRevew,
};
exports.default = appointmentController;
