import express from "express"
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/roleCheck";
import { createTransactionValidator, updateTransactionValidator } from "../validators/validators";
import { createTransaction, deleteTransaction, getAllTransactions, getTransactionById, updateTransaction } from "../controllers/transaction.controller";


const router = express.Router();



router.use(protect);


router.get("/", authorize("viewer", "analyst", "admin"), getAllTransactions);
router.get("/:id", authorize("viewer", "analyst", "admin"), getTransactionById);

// Analysts and Admins can create
router.post("/", authorize("analyst", "admin"), createTransactionValidator, createTransaction);

// Only Admins can update or delete
router.put("/:id", authorize("admin"), updateTransactionValidator, updateTransaction);
router.delete("/:id", authorize("admin"), deleteTransaction);

export default router;