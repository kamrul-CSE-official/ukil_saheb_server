import ConnectWithUs from "../models/Lawyer.model";

const getAllContacts = async (): Promise<any> => {
  try {
    const lawyers = await ConnectWithUs.find();
    return lawyers;
  } catch (error) {
    throw new Error("Failed to retrieve connects");
  }
};

const getConnectById = async (id: string): Promise<any | null> => {
  try {
    const lawyer = await ConnectWithUs.findById(id);
    return lawyer;
  } catch (error) {
    throw new Error("Failed to retrieve connect");
  }
};

const ConnectWithUsServices = {
  getAllContacts,
  getConnectById,
};
export default ConnectWithUsServices;
