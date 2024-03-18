import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import envConfig from "../../configs/envConfig";
import { IUser } from "../../types/userTypes";

// Interface for User document
export interface IUserDocument extends IUser, Document {}

// Interface for User model
export interface IUserModel extends Model<IUserDocument> {
  isUserExist(email: string): Promise<IUserDocument | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}

// Define User Schema
const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    img: { type: String, default: "https://i.ibb.co/bP8sJzJ/user.png" },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: "General" },
  },
  { timestamps: true }
);

// Middleware to hash password before saving
userSchema.pre<IUserDocument>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, Number(envConfig.bcrypt));
  }
  next();
});

// Static method to check if user exists
userSchema.statics.isUserExist = function (email: string) {
  return this.findOne({ email }).select("name img password email _id role");
};

// Static method to compare passwords
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
