import express from "express";
import { get } from "lodash";
import {
  deleteUserById,
  getUserById,
  getUserByUserName,
  getUsers,
} from "../repositories/userRepo";
import { calculateAge } from "../helpers/calcHelper";
import { responseFormat, responseFormatPaginated } from "../helpers/apiHelper";
import { upload_directory } from "../helpers/globalHelper";
import fs from "fs";
import path from "path";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;

    if (isNaN(page) || page < 1 || perPage < 1 || isNaN(perPage)) {
      return res
        .status(400)
        .json(
          responseFormat(
            false,
            null,
            "Invalid Request. Please provide Numbers greater than 0"
          )
        );
    }

    const users = await getUsers(page, perPage);

    return res
      .status(200)
      .json(responseFormatPaginated(true, users, "Users Fetched Succesfully"));
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if (deletedUser.photo) {
      const photoPath = path.join(
        __dirname,
        upload_directory,
        path.basename(deletedUser.photo)
      );

      fs.unlink(photoPath, (err) => {
        if (err) {
          console.error("Error deleting photo:", err);
        }
      });
    }

    return res
      .status(200)
      .json(responseFormat(true, deletedUser, "Successfully Deleted User"));
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUserName = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);
    const checkUser = await getUserByUserName(username);

    if (checkUser) {
      return res
        .status(400)
        .json(
          responseFormat(
            false,
            null,
            "Username already exists! Try another one"
          )
        );
    }

    user.username = username;

    await user.save();

    return res
      .status(200)
      .json(responseFormat(true, user, "Username Updated Successfully!"))
      .end();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const getProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = get(req, "identity._id") as string;
    const profile = await getUserById(id);

    const profileObject = profile.toObject();

    const response = {
      ...profileObject,
      age: calculateAge(profileObject.dob),
    };

    delete response.dob;

    return res
      .status(200)
      .json(responseFormat(true, response, "Profile retrieved successfully"));
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
