"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const getAllGeneralusers = async () => {
    try {
        const lawyers = await user_model_1.default.find();
        return lawyers;
    }
    catch (error) {
        throw new Error("Failed to retrieve lawyers");
    }
};
const getGeneralUserById = async (id) => {
    try {
        const lawyer = await user_model_1.default.findById(id);
        return lawyer;
    }
    catch (error) {
        throw new Error("Failed to retrieve lawyer");
    }
};
const lawyerServices = {
    getAllGeneralusers,
    getGeneralUserById,
};
exports.default = lawyerServices;
