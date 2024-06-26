"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const router = express_1.default.Router();
// Define routes and corresponding controller functions
const routes = [
    {
        method: "GET",
        path: "/",
        controller: user_controllers_1.default.getAllGeneralUsers,
    },
    {
        method: "GET",
        path: "/:_id",
        controller: user_controllers_1.default.getGeneralUserById,
    },
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
