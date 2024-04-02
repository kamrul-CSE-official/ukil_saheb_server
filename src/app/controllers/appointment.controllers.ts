import { Request, Response } from "express";
import appointmentServices from "../services/appointment.services";

const takeAnAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointment = await appointmentServices.createAppointment(req.body);
    res.status(201).json({
      status: "success",
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

const getAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await appointmentServices.getAllAppointments();
    res.status(200).json({
      status: "success",
      message: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

const getAppointmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointmentId = req.params._id;
    const appointment = await appointmentServices.getAppointmentById(
      appointmentId
    );
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
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch appointment",
      error: error.message,
    });
  }
};

const updateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointmentId = req.params._id;
    const updatedAppointment = await appointmentServices.updateAppointment(
      appointmentId,
      req.body
    );
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
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};

const getAppointmentRevew = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lawyerId = req.params._id;
    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);
    const revew = await appointmentServices.getRevew(lawyerId, page, limit);
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
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to get revew appointment",
      error: error.message,
    });
  }
};

const deleteAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointmentId = req.params._id;
    const deletedAppointment = await appointmentServices.deleteAppointment(
      appointmentId
    );
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
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete appointment",
      error: error.message,
    });
  }
};

const getTotalNumberOfAppiontmentRevew = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lawyerId = req.params._id;
    const totalAppointment = await appointmentServices.totalNumberOfAppointment(
      lawyerId
    );
    res.status(200).json({
      status: "success",
      message: "Successfully get total number of appointment",
      data: totalAppointment,
    });
  } catch (error: any) {
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
export default appointmentController;