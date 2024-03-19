import User from "../models/user.model";

const getAllGeneralusers = async (): Promise<any> => {
  try {
    const lawyers = await User.find();
    return lawyers;
  } catch (error) {
    throw new Error("Failed to retrieve lawyers");
  }
};

const getGeneralUserById = async (id: string): Promise<any | null> => {
  try {
    const lawyer = await User.findById(id);
    return lawyer;
  } catch (error) {
    throw new Error("Failed to retrieve lawyer");
  }
};

const lawyerServices = {
  getAllGeneralusers,
  getGeneralUserById,
};
export default lawyerServices;
