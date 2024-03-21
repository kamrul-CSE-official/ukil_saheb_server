"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const envConfig_1 = __importDefault(require("../../configs/envConfig"));
// Define User Schema
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    img: { type: String, default: "https://i.ibb.co/bP8sJzJ/user.png" },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: "General" },
}, { timestamps: true });
// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs_1.default.hash(this.password, Number(envConfig_1.default.bcrypt));
    }
    next();
});
// Static method to check if user exists
userSchema.statics.isUserExist = function (email) {
    return this.findOne({ email }).select("name img password email _id role");
};
// Static method to compare passwords
userSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
    return await bcryptjs_1.default.compare(givenPassword, savedPassword);
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
