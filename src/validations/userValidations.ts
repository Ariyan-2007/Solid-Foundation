import { body } from "express-validator";
import { user_roles } from "../helpers/globalHelper";

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),
];

export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric"),

  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Email must be a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),

  body("phone").notEmpty().withMessage("Phone number is required"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(user_roles)
    .withMessage(`Role must be one of the following: ${user_roles.join(", ")}`),

  body("dob")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),

  body("photo")
    .optional()
    .custom((value, { req }) => {
      if (req.file) {
        const fileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!fileTypes.includes(req.file.mimetype)) {
          throw new Error(
            "Photo must be a valid image format (jpeg, jpg, png, gif)"
          );
        }
      }
      return true;
    }),
];
