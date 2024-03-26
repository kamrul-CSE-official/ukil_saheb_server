import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { protectRoute } from "../middlewares/protectRoute";
import appointmentController from "../controllers/appointment.controllers";

const router = express.Router();

// Protect routes
// router.use(protectRoute);

// Appointment routes
router
  .route("/")
  .get(asyncHandler(appointmentController.getAppointments))
  .post(asyncHandler(appointmentController.takeAnAppointment));

router
  .route("/:id")
  .get(asyncHandler(appointmentController.getAppointmentById))
  .put(asyncHandler(appointmentController.updateAppointment))
  .delete(asyncHandler(appointmentController.deleteAppointment));

export default router;
