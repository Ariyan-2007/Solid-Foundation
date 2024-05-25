import express, { Router } from "express";

import { userLogin, userRegister } from "../controllers/authController";

export default (router: Router) => {
  router.post("/auth/register", userRegister);
  router.post("/auth/login", userLogin);
};
