import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";

export default (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/user", isAuthenticated, getUser);
  router.delete("/user/delete", deleteUser);
};
