import express, { Request, Response } from "express";
import {
  createUser,
  getUserByEmail,
  getUserBySession,
} from "../repositories/userRepo";
import { authentication, random } from "../helpers/authHelper";
import { HOST, expirationTime, accessPath } from "../helpers/globalHelper";
import { responseFormat } from "../helpers/apiHelper";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    const salt = random();

    user.authentication.token = authentication(salt, user._id.toString());

    await user.save();

    res.cookie("Token", user.authentication.token, {
      domain: HOST,
      path: accessPath,
      expires: expirationTime,
      httpOnly: true,
    });
    console.log("Logged in Successfully");
    return res
      .status(200)
      .json(responseFormat(true, user, "User Logged in Successfully"))
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const sessionToken = req.cookies["Token"];

    const user = await getUserBySession(sessionToken);

    if (user) {
      delete user.authentication.token;
      await user.save();
    }

    res.clearCookie("Token");

    return res
      .status(200)
      .json(responseFormat(true, user, "User Logged Out Successfully"));
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const {
      username,
      name,
      phone,
      email,
      password,
      role,
      photo,
      gender,
      dob,
      address,
    } = req.body;

    const photoUrl = req.file ? req.file.path : null;

    const salt = random();
    const user = await createUser({
      username,
      name,
      phone,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      status: "pending",
      role,
      photo: photoUrl,
      gender,
      dob,
      address,
    });

    return res
      .status(200)
      .json(
        responseFormat(true, user, "User Registration Completed Successfully")
      )
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
