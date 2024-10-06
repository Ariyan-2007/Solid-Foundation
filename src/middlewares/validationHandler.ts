import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { getUserByEmail, getUserByUserName } from "../repositories/userRepo";
import { upload_directory } from "../helpers/globalHelper";
import { authentication } from "../helpers/authHelper";

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await getUserByEmail(email).select(
    "+authentication.salt +authentication.password"
  );
  if (!user) {
    return res.status(403).json({ message: "Wrong Email/Password. Try Again" });
  }
  const expectedHash = authentication(user.authentication.salt, password);

  if (user.authentication.password !== expectedHash) {
    return res.status(403).json({ message: "Wrong Email/Password. Try Again" });
  }

  next();
};

export const validateRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      const filePath = path.join(
        __dirname,
        upload_directory,
        req.file.filename
      );
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username } = req.body;

  const existingUserEmail = await getUserByEmail(email);
  const existingUserName = await getUserByUserName(username);

  if (existingUserEmail) {
    if (req.file) {
      const filePath = path.join(
        __dirname,
        upload_directory,
        req.file.filename
      );
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    return res.status(400).json({ message: "Email already in use" });
  }

  if (existingUserName) {
    if (req.file) {
      const filePath = path.join(
        __dirname,
        upload_directory,
        req.file.filename
      );
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    return res.status(400).json({ message: "Username already in use" });
  }

  next();
};
