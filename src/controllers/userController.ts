import express from "express";
import { Request, Response } from "express";
import { getUsers } from "../repositories/userRepository";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
