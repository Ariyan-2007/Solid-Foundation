import express from "express";
import { Request, Response, NextFunction } from "express";
import { get, identity, merge } from "lodash";
import { getUserBySessionToken } from "../repositories/userRepository";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionToken = req.cookies["ARIYAN-AUTH"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
