import express from "express";
import appointmentController from "../controllers/appointment.controllers";
import { protectRoute } from "../middlewares/protectRoute";
import asyncHandler from "../middlewares/asyncHandler";

const router = express.Router();

// Protect routes
router.use(protectRoute);

// Appointment routes
router
  .route("/")
  .post(asyncHandler(appointmentController.takeAnAppointment))
  .get(asyncHandler(appointmentController.getAppointments));

router
  .route("/:id")
  .get(asyncHandler(appointmentController.getAppointmentById))
  .put(asyncHandler(appointmentController.updateAppointment))
  .delete(asyncHandler(appointmentController.deleteAppointment));

export default router;
