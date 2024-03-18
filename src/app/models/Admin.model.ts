import { Schema, model, Model } from "mongoose";
import { IAdmin } from "../../types/adminTypes";

// Interface for Admin document
export interface IAdminDocument extends IAdmin {}

// Interface for Admin model
export interface IAdminModel extends Model<IAdminDocument> {
  isAdmin(email: string): Promise<IAdminDocument | null>;
}
// Define Admin Schema
const adminSchema = new Schema<IAdminDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    role: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

// Static method to check if admin exists
adminSchema.statics.isAdmin = function (email: string) {
  return this.findOne({ email }).select("name img email _id role id");
};

const Admin = model<IAdminDocument, IAdminModel>("Admin", adminSchema);

export default Admin;
