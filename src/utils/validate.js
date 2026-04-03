import {validationResult} from "express-validator"

/**
 * Call this at the start of any controller that uses validators.
 * Returns error response if validation fails, otherwise does nothing.
 */
export const validate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
    return false; // signals that response was already sent
  }
  return true; // validation passed
};

