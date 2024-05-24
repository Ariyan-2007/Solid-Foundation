// authController.ts
import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
import { getUserByEmail } from "../repositories/userRepository";

export async function userRegister(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const user = await registerUser(email, username, password);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function userLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const user = await loginUser(email, password);

    if (user) {
      await user.save();

      res.cookie("ARIYAN_DEMO_REST_API", user.authentication.sessionToken, {
        domain: "localhost",
      });

      return res.status(200).json(user).end();
    } else {
      return res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
