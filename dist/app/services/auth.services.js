"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const Lawyer_model_1 = __importDefault(require("../models/Lawyer.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const registerGeneralUser = async (userData) => {
    return await user_model_1.default.create(userData);
};
const registerLawyerUser = async (userData) => {
    return await Lawyer_model_1.default.create(userData);
};
const login = async (inputPassword, existUserPassword) => {
    const isUserPasswordMatched = await user_model_1.default.isPasswordMatched(inputPassword, existUserPassword);
    const isLawyerPasswordMatched = await Lawyer_model_1.default.isPasswordMatched(inputPassword, existUserPassword);
    return isUserPasswordMatched || isLawyerPasswordMatched;
};
exports.authServices = {
    registerGeneralUser,
    registerLawyerUser,
    login,
};
