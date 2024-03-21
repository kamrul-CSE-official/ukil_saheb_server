"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectWithUs_services_1 = __importDefault(require("../services/connectWithUs.services"));
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await connectWithUs_services_1.default.getAllContacts();
        res.status(200).json(contacts);
    }
    catch (error) {
        next(error);
    }
};
const getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await connectWithUs_services_1.default.getConnectById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    }
    catch (error) {
        next(error);
    }
};
const createContact = async (req, res, next) => {
    try {
        const data = req.body;
        const newContact = await connectWithUs_services_1.default.createConnectWithUs(data);
        res.status(201).json(newContact);
    }
    catch (error) {
        next(error);
    }
};
const updateContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedContact = await connectWithUs_services_1.default.updateConnectWithUs(id, data);
        res.status(200).json(updatedContact);
    }
    catch (error) {
        next(error);
    }
};
const deleteContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedContact = await connectWithUs_services_1.default.deleteConnectWithUs(id);
        res.status(200).json(deletedContact);
    }
    catch (error) {
        next(error);
    }
};
const connectWithUsControllers = {
    getAllContacts,
    getContactById,
    createContact,
    updateContactById,
    deleteContactById,
};
exports.default = connectWithUsControllers;
