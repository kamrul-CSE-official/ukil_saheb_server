"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const envConfig_1 = __importDefault(require("../../configs/envConfig"));
// Define Lawyer Schema
const lawyerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    img: { type: String, default: "https://i.ibb.co/bP8sJzJ/user.png" },
    password: { type: String, required: true, minlength: 6 },
    city: { type: String, required: true },
    education: { type: String, required: true },
    occupation: { type: String, required: true },
    experience: { type: Number, required: true },
    about: { type: String, required: true },
    role: { type: String, default: "Lawyer" },
    avgRating: { type: Number, default: 0 }
}, { timestamps: true });
// Middleware to hash password before saving
lawyerSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, Number(envConfig_1.default.bcrypt));
    next();
});
// Static method to check if user exists
lawyerSchema.statics.isUserExist = function (email) {
    return this.findOne({ email }).select("name img password email _id role");
};
// Static method to compare passwords
lawyerSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
    return await bcryptjs_1.default.compare(givenPassword, savedPassword);
};
const Lawyer = (0, mongoose_1.model)("Lawyer", lawyerSchema);
exports.default = Lawyer;
