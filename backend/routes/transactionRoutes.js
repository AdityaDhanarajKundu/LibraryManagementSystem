// routes the http requests for transaction related endpoints

import express from "express";
import { borrowBook, returnBook, getUserTransactions, getAllTransactions } from "../controllers/transactionController.js";
import {authenticateToken, isAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/borrow", authenticateToken, borrowBook);
router.post("/return", authenticateToken, returnBook);
router.get("/:userId", authenticateToken, getUserTransactions);
router.get("/", authenticateToken, isAdmin, getAllTransactions);

export default router;