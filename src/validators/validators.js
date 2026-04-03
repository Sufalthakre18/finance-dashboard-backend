import { body } from "express-validator"

//Auth Validators 

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Role must be viewer, analyst, or admin"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];


export const createTransactionValidator = [
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("date").optional().isISO8601().withMessage("Date must be a valid date"),
  body("notes").optional().isLength({ max: 500 }).withMessage("Notes max 500 chars"),
];

export const updateTransactionValidator = [
  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  body("category").optional().trim().notEmpty().withMessage("Category cannot be empty"),
  body("date").optional().isISO8601().withMessage("Date must be a valid date"),
  body("notes").optional().isLength({ max: 500 }).withMessage("Notes max 500 chars"),
];


export const updateRoleValidator = [
  body("role")
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Role must be viewer, analyst, or admin"),
];

export const updateStatusValidator = [
  body("isActive").isBoolean().withMessage("isActive must be true or false"),
];

