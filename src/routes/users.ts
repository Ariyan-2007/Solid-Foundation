import { Router } from "express";
import { getAllUsers } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";
export default (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
};
