import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";

export default (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/user", isAuthenticated, getUser);
  router.patch("/user/update", isAuthenticated, updateUser);
  router.delete("/user/delete", deleteUser);
};
