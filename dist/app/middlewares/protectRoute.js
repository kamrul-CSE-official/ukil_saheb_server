"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jwtToken_1 = require("../../utils/jwtToken");
const protectRoute = async (req, res, next) => {
    try {
        (0, jwtToken_1.verifyRefreshToken)(req, res, () => {
            const refreshTokenEmail = req?.refreshTokenData?.email;
            // If refresh token is valid, proceed to verify access token
            (0, jwtToken_1.verifyAccessToken)(req, res, () => {
                const accessTokenEmail = req?.accessTokenData?.email;
                // If access token is also valid, proceed to next middleware or route
                if (refreshTokenEmail === accessTokenEmail) {
                    next();
                }
                else {
                    return res
                        .status(403)
                        .json({ message: "Forbidden access", status: "fail" });
                }
            });
        });
    }
    catch (error) {
        console.error("ProtectRoute error: ", error);
        return res
            .status(500)
            .json({ status: "fail", message: "Internal Server Error" });
    }
};
exports.protectRoute = protectRoute;
