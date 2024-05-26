import { Request, Response } from "express";
import {
  fetchAllUsers,
  fetchUserByIdOrEmail,
  removeUserById,
} from "../services/userService";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await fetchAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(400).json({ message: error.message });
    }
    console.error("Unknown error occurred");
    return res.status(400).json({ message: "Unknown error occurred" });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id, email } = req.query;
    const user = await fetchUserByIdOrEmail(id as string, email as string);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(400).json({ message: error.message });
    }
    console.error("Unknown error occurred");
    return res.status(400).json({ message: "Unknown error occurred" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Please provide an id" });
    }

    await removeUserById(id as string);
    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(400).json({ message: error.message });
    }
    console.error("Unknown error occurred");
    return res.status(400).json({ message: "Unknown error occurred" });
  }
}
