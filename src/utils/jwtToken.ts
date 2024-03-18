import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import env from "../configs/envConfig";

interface JwtPayload {
  [key: string]: any;
}

const createRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.refreshTokenSecret as string, {
    expiresIn: env.refreshTokenExpiresIn,
    algorithm: "HS384",
  });
};

const createAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.accessTokenSecret as string, {
    expiresIn: env.accessTokenExpiresIn,
    algorithm: "HS512",
  });
};

const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res
      .status(403)
      .json({ message: "Forbidden access", status: "fail" });
  }

  jwt.verify(
    refreshToken,
    env.refreshTokenSecret as string,
    (err: any, decoded: any) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Forbidden access", status: "fail" });
      }
      (req as any).refreshTokenData = decoded;
      next();
    }
  );
};

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken: string | undefined =
    req.headers?.authorization?.split(" ")[1];
    if (!accessToken) {
      return res
        .status(403)
        .json({ message: "Forbidden access", status: "fail" });
    }

    jwt.verify(
      accessToken,
      env.accessTokenSecret as string,
      (err: any, decoded: any) => {
        if (err) {
          console.log("Error aaa", err.name);
          if (err.name === "TokenExpiredError") {
            const expiredDecoded: any = jwt.decode(accessToken);
            if (!expiredDecoded) {
              return res.status(401).json({
                message: "Invalid access token",
                status: "fail",
              });
            }
            const { name, img, _id } = expiredDecoded;
            const newAccessToken = createAccessToken({ name, img, _id });
            return res.status(401).json({
              message: "Access token expired",
              status: "fail",
              accessToken: `Bearer ${newAccessToken}`,
            });
          } else {
            return res
              .status(403)
              .json({ message: "Forbidden access", status: "fail" });
          }
        } else {
          (req as any).accessTokenData = decoded;
          next();
        }
      }
    );
};


export {
  createRefreshToken,
  createAccessToken,
  verifyRefreshToken,
  verifyAccessToken,
};
