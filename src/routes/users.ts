import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";
import { checkRole } from "../middlewares/roleMiddleware";

export default (router: Router) => {
  router.get("/users", isAuthenticated, checkRole(["Admin"]), getAllUsers);
  router.get("/user", isAuthenticated, getUser);
  router.patch(
    "/user/update",
    isAuthenticated,
    upload.single("profilePic"),
    updateUser
  );
  router.delete(
    "/user/delete",
    isAuthenticated,
    checkRole(["Admin"]),
    deleteUser
  );
};
