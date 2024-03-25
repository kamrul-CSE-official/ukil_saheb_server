"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const router = express_1.default.Router();
// Define routes and corresponding controller functions
const routes = [
    {
        method: "POST",
        path: "/register/lawyer",
        controller: auth_controllers_1.authControllers.registerLawyerController,
    },
    {
        method: "POST",
        path: "/register/general",
        controller: auth_controllers_1.authControllers.registerGeneralController,
    },
    {
        method: "POST",
        path: "/login",
        controller: auth_controllers_1.authControllers.loginController,
    },
    {
        method: "GET",
        path: "/logout",
        controller: auth_controllers_1.authControllers.logoutController,
    },
];
// Map routes to controller functions
routes.forEach(({ method, path, controller }) => {
    switch (method) {
        case "POST":
            router.post(path, (0, asyncHandler_1.default)(controller));
            break;
        case "GET":
            router.get(path, (0, asyncHandler_1.default)(controller));
        default:
            console.error(`Unsupported HTTP method: ${method}`);
    }
});
exports.default = router;
