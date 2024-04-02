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
  .route("/:_id")
  .get(asyncHandler(appointmentController.getAppointmentById))
  .put(asyncHandler(appointmentController.updateAppointment))
  .delete(asyncHandler(appointmentController.deleteAppointment));

router
  .route("/revew/:_id")
  .get(asyncHandler(appointmentController.getAppointmentRevew));

  
router
  .route("/totalNumber/:_id")
  .get(asyncHandler(appointmentController.getTotalNumberOfAppiontmentRevew));



export default router;
