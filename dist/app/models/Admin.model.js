"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define Admin Schema
const adminSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    role: { type: String, default: "Admin" },
}, { timestamps: true });
// Static method to check if admin exists
adminSchema.statics.isAdmin = function (email) {
    return this.findOne({ email }).select("name img email _id role id");
};
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = Admin;
