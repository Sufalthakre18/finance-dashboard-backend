import express from "express";

import {
  getSummary,
  getCategoryTotals,
  getMonthlyTrends,
  getWeeklyTrends,
  getRecentActivity,
} from "../controllers/dashboard.controller.js";

import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/roleCheck.js";

const router = express.Router();


router.use(protect);

router.get("/summary", authorize("viewer", "analyst", "admin"), getSummary);

router.get("/category-totals",authorize("viewer", "analyst", "admin"),getCategoryTotals
);

router.get("/recent",authorize("viewer", "analyst", "admin"),getRecentActivity
);


router.get("/monthly-trends",authorize("analyst", "admin"),getMonthlyTrends
);

router.get("/weekly-trends",authorize("analyst", "admin"),getWeeklyTrends
);

export default router;