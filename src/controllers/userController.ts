import { Request, Response } from "express";
import {
  fetchAllUsers,
  fetchUserByIdOrEmail,
  removeUserById,
  updateUserDataById,
} from "../services/userService";
import { BASE_FILES_URL } from "../config/appConfig";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await fetchAllUsers();
    if (typeof users === "string") {
      console.error(users);
      return res.status(400).json({ message: users });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Unknown error occurred:", error);
    return res.status(500).json({ message: "Unknown error occurred" });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id, email } = req.query;
    const user = await fetchUserByIdOrEmail(id as string, email as string);

    if (typeof user === "string") {
      console.error(user);
      return res.status(400).json({ message: user });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Unknown error occurred:", error);
    return res.status(500).json({ message: "Unknown error occurred" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Please provide an id" });
    }

    const result = await removeUserById(id as string);
    if (typeof result === "string") {
      console.error(result);
      return res.status(400).json({ message: result });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Unknown error occurred:", error);
    return res.status(500).json({ message: "Unknown error occurred" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.query;
    let values;
    if (req.file) {
      values = {
        ...req.body,
        profilePic: BASE_FILES_URL + req.file.path,
      };
    } else {
      values = req.body;
    }

    if (id === undefined || id === "") {
      return res.status(400).json({ message: "Please provide an id" });
    }

    const result = await updateUserDataById(id as string, values);
    if (typeof result === "string") {
      console.error(result);
      return res.status(400).json({ message: result });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Unknown error occurred:", error);
    return res.status(500).json({ message: "Unknown error occurred" });
  }
}
