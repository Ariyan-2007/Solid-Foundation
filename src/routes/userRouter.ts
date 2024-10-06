import express from "express";

import {
  deleteUser,
  getAllUsers,
  getProfile,
  updateUserName,
} from "../controllers/userController";
import {
  isAuthenticated,
  isAuthorized,
  isOwner,
} from "../middlewares/authHandler";

export default (router: express.Router) => {
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: User Management Endpoints
   */

  /**
   * @swagger
   * /users/all:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     security:
   *       - CookieAuth: []
   *     responses:
   *       200:
   *         description: Successfully retrieved all users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   username:
   *                     type: string
   *                   email:
   *                     type: string
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  router.get(
    "/users/all",
    isAuthenticated,
    isAuthorized(["Admin"]),
    getAllUsers
  );

  /**
   * @swagger
   * /users/profile:
   *   get:
   *     summary: Get the logged-in user's profile
   *     tags: [Users]
   *     security:
   *       - CookieAuth: []
   *     responses:
   *       200:
   *         description: Successfully retrieved user profile
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 username:
   *                   type: string
   *                 email:
   *                   type: string
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  router.get("/users/profile", isAuthenticated, getProfile);

  /**
   * @swagger
   * /users/delete/{id}:
   *   delete:
   *     summary: Delete a user
   *     tags: [Users]
   *     security:
   *       - CookieAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the user to delete
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: User deleted successfully
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden, you are not the owner
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  router.delete("/users/delete/:id", isAuthenticated, isOwner, deleteUser);

  /**
   * @swagger
   * /users/update-username/{id}:
   *   patch:
   *     summary: Update a user's username
   *     tags: [Users]
   *     security:
   *       - CookieAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the user to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *     responses:
   *       200:
   *         description: Username updated successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden, you are not the owner
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  router.patch(
    "/users/update-username/:id",
    isAuthenticated,
    isOwner,
    updateUserName
  );
};
