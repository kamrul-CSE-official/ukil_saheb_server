"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.verifyRefreshToken = exports.createAccessToken = exports.createRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = __importDefault(require("../configs/envConfig"));
const createRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, envConfig_1.default.refreshTokenSecret, {
        expiresIn: envConfig_1.default.refreshTokenExpiresIn,
        algorithm: "HS384",
    });
};
exports.createRefreshToken = createRefreshToken;
const createAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, envConfig_1.default.accessTokenSecret, {
        expiresIn: envConfig_1.default.accessTokenExpiresIn,
        algorithm: "HS512",
    });
};
exports.createAccessToken = createAccessToken;
const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res
            .status(403)
            .json({ message: "Forbidden access", status: "fail" });
    }
    jsonwebtoken_1.default.verify(refreshToken, envConfig_1.default.refreshTokenSecret, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Forbidden access", status: "fail" });
        }
        req.refreshTokenData = decoded;
        next();
    });
};
exports.verifyRefreshToken = verifyRefreshToken;
const verifyAccessToken = (req, res, next) => {
    const accessToken = req.headers?.authorization?.split(" ")[1];
    if (!accessToken) {
        return res
            .status(403)
            .json({ message: "Forbidden access", status: "fail" });
    }
    jsonwebtoken_1.default.verify(accessToken, envConfig_1.default.accessTokenSecret, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                // If token is expired, generate a new access token and attach it to the response
                const newAccessToken = createAccessToken(decoded);
                return res.status(401).json({
                    message: "Access token expired",
                    status: "fail",
                    accessToken: newAccessToken,
                });
            }
            else {
                return res
                    .status(403)
                    .json({ message: "Forbidden access", status: "fail" });
            }
        }
        req.accessTokenData = decoded;
        next();
    });
};
exports.verifyAccessToken = verifyAccessToken;
