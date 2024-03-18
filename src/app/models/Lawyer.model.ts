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
    role: { type: String, default: "Lawyer" },
    avgRating: {type: Number, default: 0}
  },
  { timestamps: true }
);

// Middleware to hash password before saving
lawyerSchema.pre<ILawyerDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, Number(envConfig.bcrypt));
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
