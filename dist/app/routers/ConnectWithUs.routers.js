"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectWithUs_controllers_1 = __importDefault(require("../controllers/connectWithUs.controllers"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = express_1.default.Router();
// Define routes and corresponding controller functions
const routes = [
    {
        method: "GET",
        path: "/",
        controller: connectWithUs_controllers_1.default.getAllContacts,
    },
    {
        method: "GET",
        path: "/:_id",
        controller: connectWithUs_controllers_1.default.getContactById,
    },
    {
        method: "POST",
        path: "/",
        controller: connectWithUs_controllers_1.default.createContact,
    },
    {
        method: "DELETE",
        path: "/:_id",
        controller: connectWithUs_controllers_1.default.deleteContactById,
    },
    {
        method: "PATCH",
        path: "/:_id",
        controller: connectWithUs_controllers_1.default.updateContactById,
    },
];
// Map routes to controller functions
routes.forEach(({ method, path, controller }) => {
    switch (method) {
        case "GET":
            router.get(path, (0, asyncHandler_1.default)(controller));
            break;
        case "POST":
            router.post(path, (0, asyncHandler_1.default)(controller));
            break;
        case "DELETE":
            router.delete(path, (0, asyncHandler_1.default)(controller));
            break;
        case "PATCH":
            router.patch(path, (0, asyncHandler_1.default)(controller));
            break;
        default:
            console.error(`Unsupported HTTP method: ${method}`);
    }
});
exports.default = router;
