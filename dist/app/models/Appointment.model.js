"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    lawyer: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lawyer", required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending",
    },
    userImg: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number, default: 0 },
}, { timestamps: true });
const Appointment = (0, mongoose_1.model)("Appointment", appointmentSchema);
exports.default = Appointment;
