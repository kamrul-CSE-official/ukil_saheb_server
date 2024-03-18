import { Request, Response } from "express";
import User from "../models/user.model";
import { createAccessToken, createRefreshToken } from "../../utils/jwtToken";
import { authServices } from "../services/auth.services";
import { logger } from "../../shared/logger";
import Lawyer from "../models/Lawyer.model";
import Admin from "../models/Admin.model";

const registerGeneralController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // Check if user already exists in either User or Lawyer collection
    const isAlreadyExist =
      (await User.findOne({ email: userData.email })) ||
      (await Lawyer.findOne({ email: userData.email }));

    if (isAlreadyExist) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }

    // Register the user
    const register = await authServices.registerGeneralUser(userData);

    if (!register) {
      return res
        .status(400)
        .json({ status: "error", message: "User registration failed" });
    }

    logger.info(`${register.email} successfully registered.`);
    return res
      .status(201)
      .json({ status: "success", message: "Successfully registered" });
  } catch (error) {
    logger.error("Error registering user:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
};

const registerLawyerController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // Check if user already exists in either User or Lawyer collection
    const isAlreadyExist =
      (await User.findOne({ email: userData.email })) ||
      (await Lawyer.findOne({ email: userData.email }));

    if (isAlreadyExist) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }

    // Register the user
    const register = await authServices.registerLawyerUser(userData);

    if (!register) {
      return res
        .status(400)
        .json({ status: "error", message: "User registration failed" });
    }

    logger.info(`${register.email} successfully registered.`);
    return res
      .status(201)
      .json({ status: "success", message: "Successfully registered" });
  } catch (error) {
    logger.error("Error registering user:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in either User or Lawyer collection
    const existUser =
      (await User.isUserExist(email)) || (await Lawyer.isUserExist(email));

    if (!existUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await authServices.login(password, existUser.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }

    logger.info(`${existUser.email} login successful`);

    // Check if the user is an Admin, and if so, set the role accordingly
    const isAdmin = await Admin.isAdmin(email);
    const power = isAdmin ? isAdmin.role : existUser.role;

    // Generate tokens
    const payload = {
      name: existUser.name,
      email: existUser.email,
      img: existUser.img,
      _id: existUser._id,
      role: existUser.role,
      power: power,
    };

    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    // Set refreshToken in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 200 * 24 * 60 * 60 * 1000,
    });

    // Send response with access token
    res.status(200).json({
      status: "success",
      message: "Login successful",
      accessToken: `Bearer ${accessToken}`,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

const logoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};

export const authControllers = {
  registerGeneralController,
  registerLawyerController,
  loginController,
  logoutController,
};
