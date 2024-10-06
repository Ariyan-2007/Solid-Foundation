import express from "express";
import { login, logout, register } from "../controllers/authController";
import { uploadImage } from "../middlewares/fileHandler";
import {
  loginValidation,
  registerValidation,
} from "../validations/userValidations";
import {
  validateLogin,
  validateRegistration,
} from "../middlewares/validationHandler";
import { isAllowed, isAuthenticated } from "../middlewares/authHandler";

export default (router: express.Router) => {
  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Auth Management Endpoints
   */

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               name:
   *                 type: string
   *               phone:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *               role:
   *                 type: string
   *               photo:
   *                 type: string
   *                 format: binary
   *               gender:
   *                 type: string
   *                 enum: [male, female, other]
   *               dob:
   *                 type: string
   *                 format: date
   *               address:
   *                 type: string
   *     responses:
   *       201:
   *         description: User registered successfully
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  router.post(
    "/auth/register",

    uploadImage.single("photo"),
    registerValidation,
    validateRegistration,
    register
  );

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Log in a user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User logged in successfully
   *       401:
   *         description: Unauthorized
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  router.post("/auth/login", loginValidation, validateLogin, isAllowed, login);

  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     summary: Log out a user
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: User logged out successfully
   *       401:
   *         description: Unauthorized
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  router.post("/auth/logout", isAuthenticated, logout);
};
