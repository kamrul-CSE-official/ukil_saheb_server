"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectWithUsSchema = new mongoose_1.Schema({
    senderId: { type: String, default: "" },
    receiverId: { type: String, default: "Admin" },
    img: { type: String, default: "https://avatar.iran.liara.run/public/boy" },
    name: { type: String, default: "" },
    date: {
        type: String,
        default: `${new Date().getHours()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    },
    message: { type: String, required: true },
}, { timestamps: true });
const CommectWithUs = (0, mongoose_1.model)("ConnectWithUs", connectWithUsSchema);
exports.default = CommectWithUs;
