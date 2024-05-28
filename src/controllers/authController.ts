// authController.ts
import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
import { DOMAIN } from "../config/appConfig";

export async function userRegister(req: Request, res: Response) {
  try {
    const { email, password, username, dob } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const response = await registerUser(email, username, password, dob);
    if (typeof response === "string") {
      return res.status(400).json({ error: response });
    } else {
      return res.status(200).json(response);
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

    if (typeof user === "string") {
      return res.status(401).json({ error: user });
    } else {
      await user.save();

      res.cookie("ARIYAN-AUTH", user.authentication.sessionToken, {
        domain: DOMAIN,
      });

      return res.status(200).json(user).end();
    }
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
