import { Types } from "mongoose";
import Appointment from "../models/Appointment.model";
import Lawyer from "../models/Lawyer.model";

const getAllLawyers = async (): Promise<any> => {
  try {
    const lawyers = await Lawyer.find();
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
    let bestLawyers = await Promise.all(
      bestLawyerIds.map(async (id) => {
        const lawyer = await Lawyer.findById(id);
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

    // Check if all lawyers are null or the array is empty
    const allNull = bestLawyers.every((lawyer) => lawyer === null);
    if (allNull || !bestLawyers.length) {
      // If all lawyers are null or the array is empty, fetch data directly from Lawyer model
      bestLawyers = await Lawyer.find()
        .limit(limit)
        .skip((page - 1) * limit);
    }

    return bestLawyers.filter((lawyer) => lawyer !== null); // Filtering out null values
  } catch (error) {
    console.error("Error finding best lawyers:", error);
    throw error;
  }
};

const getLawyerById = async (id: string): Promise<any | null> => {
  try {
    const lawyer = await Lawyer.findById(id);
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
