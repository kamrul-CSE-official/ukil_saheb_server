import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../../utils/jwtToken";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    verifyRefreshToken(req, res, () => {
      const refreshTokenEmail = (req as any)?.refreshTokenData?.email;
      // If refresh token is valid, proceed to verify access token
      verifyAccessToken(req, res, () => {
        const accessTokenEmail = (req as any)?.accessTokenData?.email;
        // If access token is also valid, proceed to next middleware or route
        if (refreshTokenEmail === accessTokenEmail) {
          next();
        } else {
          return res
            .status(403)
            .json({ message: "Forbidden access", status: "fail" });
        }
      });
    });
  } catch (error: any) {
    console.error("ProtectRoute error: ", error);
    return res
      .status(500)
      .json({ status: "fail", message: "Internal Server Error" });
  }
};
