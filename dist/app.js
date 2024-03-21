"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = require("express-rate-limit");
const auth_routers_1 = __importDefault(require("./app/routers/auth.routers"));
const appointment_routers_1 = __importDefault(require("./app/routers/appointment.routers"));
const lawyer_routers_1 = __importDefault(require("./app/routers/lawyer.routers"));
const ConnectWithUs_routers_1 = __importDefault(require("./app/routers/ConnectWithUs.routers"));
const user_routers_1 = __importDefault(require("./app/routers/user.routers"));
const app = (0, express_1.default)();
// Rate limiting configuration
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Sorry, you have exceeded the request limit. Please try again later after some time.",
});
// Middleware setup
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/api/v1", (req, res) => {
    res.send("Ukil Saheb ⚖️");
});
// Routers setup
app.use("/api/v1/auth", limiter, auth_routers_1.default);
app.use("/api/v1/users", user_routers_1.default);
app.use("/api/v1/lawyers", lawyer_routers_1.default);
app.use("/api/v1/connect", ConnectWithUs_routers_1.default);
app.use("/api/v1/appointments", appointment_routers_1.default);
// Error handler
app.use((req, res, next) => {
    console.log("Requested URL:", req.url);
    next("Requested URL was not found!");
});
app.use((err, req, res, next) => {
    if (err.message) {
        res.status(500).json({ status: "fail", message: err.message });
    }
    else {
        next(err);
    }
});
exports.default = app;
