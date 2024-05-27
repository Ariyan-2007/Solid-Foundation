import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

interface IUserModel extends IUser, Document {}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  role: { type: String, required: true },

  joiningDate: { type: Date },

  authentication: {
    password: { type: String, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  profilePic: { type: Buffer },
  name: {
    firstName: { type: String },
    lastName: { type: String },
  },
  contact: {
    phone: { type: String },
    address: { type: String },
  },
  preferences: {
    favoriteDish: { type: String },
    dietaryRestrictions: [{ type: String }],
  },
  orderHistory: [
    {
      orderId: { type: String },
      date: { type: Date },
      totalAmount: { type: Number },
    },
  ],
  paymentInfo: {
    cardNumber: { type: String },
    expirationDate: { type: Date },
    cvv: { type: String },
  },
  socialProfiles: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  subscription: {
    plan: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  notificationPreferences: {
    email: { type: Boolean },
    sms: { type: Boolean },
    push: { type: Boolean },
  },
});

export const UserModel = mongoose.model<IUserModel>("User", UserSchema);
