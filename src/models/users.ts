import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: false, select: false },
    token: { type: String, required: false, select: false },
  },
  status: { type: String, required: true },
  role: { type: String, required: true },
  photo: { type: String, required: false },
  gender: { type: String, required: false },
  dob: { type: Date, required: false },
  address: { type: String, required: false },
});

export const UserModel = mongoose.model("User", UserSchema);
