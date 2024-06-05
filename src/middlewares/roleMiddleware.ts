import { Request, Response, NextFunction } from "express";
import { getUserBySessionToken } from "../repositories/userRepository";
import { IUser } from "../interfaces/IUser";

interface AuthenticatedRequest extends Request {
  identity?: IUser;
}

export function checkRole(allowedRoles: Array<string>) {
  return async function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const existingUser = req.identity;

      if (!existingUser) {
        return res.sendStatus(403);
      }

      const userRole = existingUser.role;

      if (userRole && allowedRoles.includes(userRole)) {
        return next();
      } else {
        res
          .status(403)
          .json({ error: "Access denied. Role authorization required." });
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
}
