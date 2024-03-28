"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtToken_1 = require("../../utils/jwtToken");
const auth_services_1 = require("../services/auth.services");
const Lawyer_model_1 = __importDefault(require("../models/Lawyer.model"));
const Admin_model_1 = __importDefault(require("../models/Admin.model"));
const registerGeneralController = async (req, res) => {
    try {
        const userData = req.body;
        // Check if user already exists in either User or Lawyer collection
        const isAlreadyExist = (await user_model_1.default.findOne({ email: userData.email })) ||
            (await Lawyer_model_1.default.findOne({ email: userData.email }));
        if (isAlreadyExist) {
            return res
                .status(400)
                .json({ status: "error", message: "User already exists" });
        }
        // Register the user
        const register = await auth_services_1.authServices.registerGeneralUser(userData);
        if (!register) {
            return res
                .status(400)
                .json({ status: "error", message: "User registration failed" });
        }
        console.log(`${register.email} successfully registered.`);
        return res
            .status(201)
            .json({ status: "success", message: "Successfully registered" });
    }
    catch (error) {
        console.log("Error registering user:", error);
        return res
            .status(500)
            .json({ status: "error", message: "Something went wrong" });
    }
};
const registerLawyerController = async (req, res) => {
    try {
        const userData = req.body;
        // Check if user already exists in either User or Lawyer collection
        const isAlreadyExist = (await user_model_1.default.findOne({ email: userData.email })) ||
            (await Lawyer_model_1.default.findOne({ email: userData.email }));
        if (isAlreadyExist) {
            return res
                .status(400)
                .json({ status: "error", message: "User already exists" });
        }
        // Register the user
        const register = await auth_services_1.authServices.registerLawyerUser(userData);
        if (!register) {
            return res
                .status(400)
                .json({ status: "error", message: "User registration failed" });
        }
        console.log(`${register.email} successfully registered.`);
        return res
            .status(201)
            .json({ status: "success", message: "Successfully registered" });
    }
    catch (error) {
        console.log("Error registering user:", error);
        return res
            .status(500)
            .json({ status: "error", message: "Something went wrong" });
    }
};
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists in either User or Lawyer collection
        const existUser = (await user_model_1.default.isUserExist(email)) || (await Lawyer_model_1.default.isUserExist(email));
        if (!existUser) {
            return res
                .status(404)
                .json({ status: "error", message: "User not found" });
        }
        // Check if the password matches
        const isMatch = await auth_services_1.authServices.login(password, existUser.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ status: "error", message: "Invalid password" });
        }
        console.log(`${existUser.email} login successful`);
        // Check if the user is an Admin, and if so, set the role accordingly
        const isAdmin = await Admin_model_1.default.isAdmin(email);
        const power = isAdmin ? isAdmin.role : existUser.role;
        // Generate tokens
        const payload = {
            name: existUser.name,
            email: existUser.email,
            img: existUser.img,
            _id: existUser._id,
            role: existUser.role,
            power: power,
        };
        const accessToken = (0, jwtToken_1.createAccessToken)(payload);
        const refreshToken = (0, jwtToken_1.createRefreshToken)(payload);
        // Set refreshToken in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 200 * 24 * 60 * 60 * 1000,
        });
        // Send response with access token
        res.status(200).json({
            status: "success",
            message: "Login successful",
            accessToken: `Bearer ${accessToken}`,
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ status: "error", message: "Something went wrong" });
    }
};
const logoutController = async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging out" });
    }
};
exports.authControllers = {
    registerGeneralController,
    registerLawyerController,
    loginController,
    logoutController,
};
