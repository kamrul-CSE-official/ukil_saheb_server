import { Types } from "mongoose";
import Appointment from "../models/Appointment.model";
import ConnectWithUs from "../models/Lawyer.model";

const getAllLawyers = async (): Promise<any> => {
  try {
    const lawyers = await ConnectWithUs.find();
    return lawyers;
  } catch (error) {
    throw new Error("Failed to retrieve lawyers");
  }
};

const getBestLawyers = async (page: number, limit: number): Promise<any> => {
  try {
    const pipeline: any[] = [
      {
        $match: { status: "Confirmed" }, // Filter confirmed appointments
      },
      {
        $group: {
          _id: "$lawyer",
          avgRating: { $avg: "$rating" }, // Calculate average rating for each lawyer
        },
      },
      {
        $sort: { avgRating: -1 }, // Sort by average rating in descending order
      },
      {
        $limit: limit, // Limit the number of results
      },
    ];

    // Aggregate to get the IDs and average ratings of the best lawyers
    const bestLawyersIdsWithRatings = await Appointment.aggregate<{
      _id: Types.ObjectId;
      avgRating: number;
    }>(pipeline);

    // Extracting the lawyer IDs from the aggregation result
    const bestLawyerIds = bestLawyersIdsWithRatings.map((result) => result._id);

    // Fetching lawyer documents corresponding to the IDs
    const bestLawyers = await Promise.all(
      bestLawyerIds.map(async (id) => {
        const lawyer = await ConnectWithUs.findById(id);
        if (lawyer) {
          // Attach the average rating to the lawyer object
          const avgRating = bestLawyersIdsWithRatings.find((item) =>
            item._id.equals(id)
          )?.avgRating;
          lawyer.avgRating = avgRating;
          return lawyer;
        }
        return null;
      })
    );

    return bestLawyers.filter((lawyer) => lawyer !== null); // Filtering out null values
  } catch (error) {
    console.error("Error finding best lawyers:", error);
    throw error;
  }
};

const getLawyerById = async (id: string): Promise<any | null> => {
  try {
    const lawyer = await ConnectWithUs.findById(id);
    return lawyer;
  } catch (error) {
    throw new Error("Failed to retrieve lawyer");
  }
};

const lawyerServices = {
  getAllLawyers,
  getBestLawyers,
  getLawyerById,
};
export default lawyerServices;
