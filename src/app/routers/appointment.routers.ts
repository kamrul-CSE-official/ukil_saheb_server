import express from "express";
import appointmentController from "../controllers/appointment.controllers";
import { protectRoute } from "../middlewares/protectRoute";
import asyncHandler from "../middlewares/asyncHandler";

const router = express.Router();

// Protect routes
router.use(protectRoute);

// Appointment routes
router.post("/", asyncHandler(appointmentController.takeAnAppointment));
router.get("/", asyncHandler(appointmentController.getAppointments));
router.get("/:id", asyncHandler(appointmentController.getAppointmentById));
router.put("/:id", asyncHandler(appointmentController.updateAppointment));
router.delete("/:id", asyncHandler(appointmentController.deleteAppointment));

export default router;
