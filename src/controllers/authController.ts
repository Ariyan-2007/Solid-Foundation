// authController.ts
import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
import { DOMAIN } from "../config/appConfig";
import { IUser } from "../interfaces/IUser";
import { getUserBySessionToken } from "../repositories/userRepository";

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

      const sessionToken = user.authentication.sessionToken;

      if (!sessionToken) {
        return res
          .status(500)
          .json({ error: "Failed to generate session token." });
      }

      res.setHeader("Authorization", sessionToken);

      return res
        .status(200)
        .json({ message: "Login successful.", token: sessionToken })
        .end();
    }
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function userLogout(req: Request, res: Response) {
  try {
    const sessionToken = req.headers["authorization"];

    if (!sessionToken) {
      return res
        .status(400)
        .json({ error: "No session token found in authorization header." });
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.status(401).json({ error: "Invalid session token." });
    }

    user.authentication.sessionToken = "";
    await user.save();

    return res.status(200).json({ message: "Logout successful." }).end();
  } catch (error) {
    console.error("Error in user logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
