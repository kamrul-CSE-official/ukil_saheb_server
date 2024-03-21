"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lawyer_services_1 = __importDefault(require("../services/lawyer.services"));
const getAllLawyer = async (req, res) => {
    try {
        const lawyers = await lawyer_services_1.default.getAllLawyers();
        res.status(200).json({
            status: "success",
            message: "Data retrieved successfully",
            data: lawyers,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve lawyers",
            error: error.message,
        });
    }
};
const getLawyerById = async (req, res) => {
    try {
        const { id } = req.params;
        const lawyer = await lawyer_services_1.default.getLawyerById(id);
        if (!lawyer) {
            res.status(404).json({
                status: "fail",
                message: "Lawyer not found",
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Lawyer retrieved successfully",
            data: lawyer,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve lawyer",
            error: error.message,
        });
    }
};
const getBestLawyersController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const bestLawyers = await lawyer_services_1.default.getBestLawyers(page, limit);
        res.status(200).json({
            status: "success",
            message: "Data retrieved successfully",
            data: bestLawyers,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve best lawyers",
            error: error.message,
        });
    }
};
const lawyerControllers = {
    getAllLawyer,
    getBestLawyersController,
    getLawyerById,
};
exports.default = lawyerControllers;
