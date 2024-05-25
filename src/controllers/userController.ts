import express from "express";
import { Request, Response } from "express";
import {
  getUserByEmail,
  getUserById,
  getUsers,
} from "../repositories/userRepository";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    let user;

    if (req.query.id) {
      user = await getUserById(req.query.id as string);
    } else if (req.query.email) {
      user = await getUserByEmail((req.query.email as string).toLowerCase());
    } else {
      return res.status(400).json({ message: "Please provide an id or email" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
