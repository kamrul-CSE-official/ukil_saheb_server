"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const appointment_controllers_1 = __importDefault(require("../controllers/appointment.controllers"));
const router = express_1.default.Router();
// Protect routes
// router.use(protectRoute);
// Appointment routes
router
    .route("/")
    .get((0, asyncHandler_1.default)(appointment_controllers_1.default.getAppointments))
    .post((0, asyncHandler_1.default)(appointment_controllers_1.default.takeAnAppointment));
router
    .route("/:id")
    .get((0, asyncHandler_1.default)(appointment_controllers_1.default.getAppointmentById))
    .put((0, asyncHandler_1.default)(appointment_controllers_1.default.updateAppointment))
    .delete((0, asyncHandler_1.default)(appointment_controllers_1.default.deleteAppointment));
exports.default = router;
