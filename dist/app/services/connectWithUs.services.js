"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectWith_model_1 = __importDefault(require("../models/connectWith.model"));
const getAllContacts = async () => {
    try {
        const connects = await connectWith_model_1.default.find();
        return connects;
    }
    catch (error) {
        throw new Error("Failed to retrieve connects");
    }
};
const getConnectById = async (id) => {
    try {
        const query = { $or: [{ receiverId: id }, { senderId: id }] };
        const connects = await connectWith_model_1.default.find(query);
        return connects;
    }
    catch (error) {
        throw new Error("Failed to retrieve connect");
    }
};
const createConnectWithUs = async (data) => {
    try {
        const query = new connectWith_model_1.default(data);
        const result = await query.save();
        return result;
    }
    catch (error) {
        throw new Error("Failed to create connect");
    }
};
const updateConnectWithUs = async (id, data) => {
    try {
        const result = await connectWith_model_1.default.findByIdAndUpdate(id, data, {
            new: true,
        });
        return result;
    }
    catch (error) {
        throw new Error("Failed to update connect");
    }
};
const deleteConnectWithUs = async (id) => {
    try {
        const result = await connectWith_model_1.default.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw new Error("Failed to delete connect");
    }
};
const ConnectWithUsServices = {
    getAllContacts,
    getConnectById,
    createConnectWithUs,
    updateConnectWithUs,
    deleteConnectWithUs,
};
exports.default = ConnectWithUsServices;
