import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRole,
  updateUserStatus,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/roleCheck.js";

import {
  registerValidator,
  updateRoleValidator,
  updateStatusValidator,
} from "../validators/validators.js";


const router = express.Router();


router.use(protect, authorize("admin"));

router.get("/", getAllUsers);
router.post("/", registerValidator, createUser);
router.get("/:id", getUserById);

router.patch(
  "/:id/role",
  updateRoleValidator,
  updateUserRole
);

router.patch(
  "/:id/status",
  updateStatusValidator,
  updateUserStatus
);

export default router;