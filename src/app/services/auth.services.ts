import Lawyer from "../models/Lawyer.model";
import User, { IUserDocument } from "../models/user.model";

const registerGeneralUser = async (userData: IUserDocument) => {
  return await User.create(userData);
};
const registerLawyerUser = async (userData: IUserDocument) => {
  return await Lawyer.create(userData);
};

const login = async (
  inputPassword: string,
  existUserPassword: string
): Promise<boolean> => {
  const isUserPasswordMatched = await User.isPasswordMatched(
    inputPassword,
    existUserPassword
  );
  const isLawyerPasswordMatched = await Lawyer.isPasswordMatched(
    inputPassword,
    existUserPassword
  );

  return isUserPasswordMatched || isLawyerPasswordMatched;
};

export const authServices = {
  registerGeneralUser,
  registerLawyerUser,
  login,
};
