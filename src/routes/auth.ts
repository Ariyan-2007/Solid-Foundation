import express, { Router } from "express";

import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/authController";
import { isAuthenticated } from "../middlewares/authMiddleware";

export default (router: Router) => {
  router.post("/auth/register", userRegister);
  router.post("/auth/login", userLogin);
  router.post("/auth/logout", isAuthenticated, userLogout);
};
