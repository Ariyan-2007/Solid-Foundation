import { calculatePaginationMeta } from "../helpers/calcHelper";
import { UserModel } from "../models/users";

export const getUsers = async (page: number = 1, per_page: number = 10) => {
  const total = await UserModel.countDocuments();
  const users = await UserModel.find()
    .skip((page - 1) * per_page)
    .limit(per_page);

  const meta = calculatePaginationMeta(page, per_page, total, "/users");

  const responseData = {
    data: users,
    meta,
  };

  return responseData;
};

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByUserName = (username: string) =>
  UserModel.findOne({ username });
export const getUserBySession = (sessionToken: string) =>
  UserModel.findOne({ "authentication.token": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, data: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, data);
export const createUser = (data: Record<string, any>) =>
  new UserModel(data).save().then((user) => user.toObject());
