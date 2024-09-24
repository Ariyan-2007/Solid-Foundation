import { Request, Response, NextFunction } from "express";

export const dbErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "MongoNetworkError" || err.name === "MongoTimeoutError") {
    return res
      .status(503)
      .json({ message: "Database connection error. Please try again later." });
  }
  next(err);
};
