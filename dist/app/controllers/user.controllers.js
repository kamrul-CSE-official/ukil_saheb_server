"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_services_1 = __importDefault(require("../services/user.services"));
const getAllGeneralUsers = async (req, res) => {
    try {
        const generalPeople = await user_services_1.default.getAllGeneralusers();
        res.status(200).json({
            status: "success",
            message: "Data retrieved successfully",
            data: generalPeople,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve general people",
            error: error.message,
        });
    }
};
const getGeneralUserById = async (req, res) => {
    try {
        const { _id } = req.params;
        const generalPeople = await user_services_1.default.getGeneralUserById(_id);
        if (!generalPeople) {
            res.status(404).json({
                status: "fail",
                message: "Lawyer not found",
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "general people retrieved successfully",
            data: generalPeople,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve general people",
            error: error.message,
        });
    }
};
const generalUsersControllers = {
    getAllGeneralUsers,
    getGeneralUserById,
};
exports.default = generalUsersControllers;
