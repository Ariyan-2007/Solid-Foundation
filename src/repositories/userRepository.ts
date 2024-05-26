import { UserModel } from "../models/userModel";

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const getUserById = (id: string) => UserModel.findById(id);

// export const createUser = (values: Record<string, any>) =>
//   new UserModel(values).save().then((user) => user.toObject());

export const createUser = async (values: Record<string, any>) => {
  values.joiningDate = new Date();
  const newUser = new UserModel(values);
  const savedUser = await newUser.save();
  return savedUser.toObject();
};

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findOneAndUpdate({ _id: id }, values, { new: true });
