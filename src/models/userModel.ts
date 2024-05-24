import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

// interface IUserModel extends IUser, Document {}

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  authentication: {
    password: { type: String, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
