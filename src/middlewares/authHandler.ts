import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";
import { getUserByEmail, getUserBySession } from "../repositories/userRepo";
import { responseFormat } from "../helpers/apiHelper";

interface User {
  _id: string;
  role: string;
  status: string;
}

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserObject: object = get(req, "identity._id");

    if (!currentUserObject) {
      return res.sendStatus(403);
    }

    const currentUserId = currentUserObject.toString();

    if (currentUserId !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["Token"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySession(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthorized = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const currentUser: User = get(req, "identity");

    if (!currentUser || !currentUser.role) {
      return res
        .status(403)
        .json({ message: "You're not authorized to access this route" });
    }

    if (allowedRoles.includes(currentUser.role)) {
      return next();
    }

    return res
      .status(403)
      .json({ message: "You're not authorized to access this route" });
  };
};

export const isAllowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const currentUser = await getUserByEmail(email);
    if (currentUser.status === "pending") {
      return res
        .status(403)
        .json(
          responseFormat(
            false,
            null,
            "User Account not Verified. Please check mail and Verify your Account.",
            403
          )
        );
    } else if (currentUser.status === "blocked") {
      return res
        .status(403)
        .json(
          responseFormat(
            false,
            null,
            "User Account Blocked by Admin. Please contact Administration if there's any confusion.",
            403
          )
        );
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
