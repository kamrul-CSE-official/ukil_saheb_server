"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const lawyer_controllers_1 = __importDefault(require("../controllers/lawyer.controllers"));
const router = express_1.default.Router();
// Define routes and corresponding controller functions
const routes = [
    { method: "GET", path: "/", controller: lawyer_controllers_1.default.getAllLawyer },
    {
        method: "GET",
        path: "/best",
        controller: lawyer_controllers_1.default.getBestLawyersController,
    },
    { method: "GET", path: "/:id", controller: lawyer_controllers_1.default.getLawyerById },
];
// Map routes to controller functions
routes.forEach(({ method, path, controller }) => {
    switch (method) {
        case "GET":
            router.get(path, (0, asyncHandler_1.default)(controller));
            break;
        default:
            console.error(`Unsupported HTTP method: ${method}`);
    }
});
exports.default = router;
