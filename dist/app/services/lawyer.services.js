"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Appointment_model_1 = __importDefault(require("../models/Appointment.model"));
const Lawyer_model_1 = __importDefault(require("../models/Lawyer.model"));
const getAllLawyers = async (page, limit, gender, occupation) => {
    try {
        const skip = (page - 1) * limit;
        const filter = {};
        if (gender !== "All") {
            filter.gender = gender;
        }
        if (occupation !== "All") {
            filter.occupation = occupation;
        }
        const lawyers = await Lawyer_model_1.default.find(filter)
            .select("-password")
            .skip(skip)
            .limit(limit);
        return lawyers;
    }
    catch (error) {
        throw new Error("Failed to retrieve lawyers");
    }
};
const getBestLawyers = async (page, limit) => {
    try {
        // Pipeline to aggregate the best lawyers based on average rating
        const pipeline = [
            { $match: { status: "Confirmed" } }, // Filter confirmed appointments
            {
                $group: {
                    _id: "$lawyer",
                    avgRating: { $avg: "$rating" }, // Calculate average rating for each lawyer
                },
            },
            { $sort: { avgRating: -1 } }, // Sort by average rating in descending order
            { $skip: (page - 1) * limit }, // Skip records based on pagination
            { $limit: limit }, // Limit the number of results
        ];
        // Aggregate to get the IDs and average ratings of the best lawyers
        const bestLawyersIdsWithRatings = await Appointment_model_1.default.aggregate(pipeline);
        // Fetch lawyer documents corresponding to the IDs
        const bestLawyers = await Promise.all(bestLawyersIdsWithRatings.map(async (result) => {
            const lawyer = await Lawyer_model_1.default.findById(result._id).select("-password");
            if (lawyer) {
                // Attach the average rating to the lawyer object
                lawyer.avgRating = result.avgRating;
            }
            return lawyer;
        }));
        // If all lawyers are null or the array is empty, fetch data directly from Lawyer model
        if (!bestLawyers || bestLawyers.every((lawyer) => lawyer === null)) {
            const allLawyers = await Lawyer_model_1.default.find()
                .skip((page - 1) * limit) // Skip records based on pagination
                .limit(limit) // Limit the number of results
                .select("-password");
            return allLawyers.map((lawyer) => ({
                ...lawyer.toObject(),
                avgRating: null,
            }));
        }
        // Filtering out null values
        return bestLawyers.filter((lawyer) => lawyer !== null);
    }
    catch (error) {
        console.error("Error finding best lawyers:", error);
        throw error;
    }
};
const getLawyerById = async (id) => {
    try {
        const lawyer = await Lawyer_model_1.default.findById(id).select("-password");
        return lawyer;
    }
    catch (error) {
        throw new Error("Failed to retrieve lawyer");
    }
};
const totalNumberOfLawyers = async () => {
    try {
        const count = await Lawyer_model_1.default.estimatedDocumentCount();
        return count;
    }
    catch (error) {
        throw new Error("Failed to find total number of lawyers");
    }
};
const lawyerServices = {
    getAllLawyers,
    getBestLawyers,
    getLawyerById,
    totalNumberOfLawyers,
};
exports.default = lawyerServices;
