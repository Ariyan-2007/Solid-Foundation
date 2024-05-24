import express, { Router } from "express";
import auth from "./auth";
import users from "./users";

const router: Router = express.Router();

export default (): Router => {
  auth(router);
  users(router);
  return router;
};
