import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import envConfig from "../../configs/envConfig";
import { ILawyer } from "../../types/LawyerTypes";

// Interface for Lawyer document
export interface ILawyerDocument extends ILawyer, Document {}

// Interface for Lawyer model
export interface ILawyerModel extends Model<ILawyerDocument> {
  isUserExist(
    email: string
  ): Promise<Pick<
    ILawyerDocument,
    "name" | "img" | "password" | "email" | "_id" | "role"
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}

// Define review schema
const reviewSchema = new Schema({
  serviceHolderId: { type: String, required: true },
  serviceHolderName: { type: String, required: true },
  serviceHolderImg: { type: String, required: true },
  comment: { type: String, required: true },
  time: { type: String, required: true },
  rating: { type: Number, required: true },
});
// Define clients schema
const clientsSchema = new Schema({
  clientId: { type: String, required: true },
  clientName: { type: String, required: true },
  clientImg: { type: String, required: true },
  appointment: { type: String, required: true },
});

// Define Lawyer Schema
const lawyerSchema = new Schema<ILawyerDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    img: { type: String, default: "https://i.ibb.co/bP8sJzJ/user.png" },
    password: { type: String, required: true, minlength: 6 },
    city: { type: String, required: true },
    education: { type: String, required: true },
    occupation: { type: String, required: true },
    experience: { type: Number, required: true },
    about: { type: String, required: true },
    clients: [clientsSchema],
    reviews: [reviewSchema],
    ratings: { type: Number, default: 0 },
    role: { type: String, default: "Lawyer" },
  },
  { timestamps: true }
);

// Middleware to hash password before saving
lawyerSchema.pre<ILawyerDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, Number(envConfig.bcrypt));
  next();
});

// Middleware to calculate total ratings before saving
lawyerSchema.pre<ILawyerDocument>("save", function (next) {
  const totalRatings = this.reviews.reduce(
    (acc: number, review: any) => acc + review.rating,
    0
  );
  this.ratings = totalRatings;
  next();
});

// Static method to check if user exists
lawyerSchema.statics.isUserExist = function (email: string) {
  return this.findOne({ email }).select("name img password email _id role");
};

// Static method to compare passwords
lawyerSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

const Lawyer = model<ILawyerDocument, ILawyerModel>("Lawyer", lawyerSchema);

export default Lawyer;
