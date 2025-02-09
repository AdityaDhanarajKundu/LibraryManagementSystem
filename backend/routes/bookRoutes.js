// routes the http requests for book related endpoints

import express from "express";
import { getAllBooks, getBookById, addBook, getBooksByGenre, getBorrowedBooksByUser, updateBook, removeBook} from "../controllers/bookController.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/filesMiddleware.js";

const router = express.Router();

router.get("/",authenticateToken, getAllBooks);
router.get("/categories",authenticateToken, getBooksByGenre);
router.get("/borrowed-books", authenticateToken, getBorrowedBooksByUser);
router.post("/",authenticateToken, isAdmin, uploadMiddleware, addBook);
router.get("/:id", authenticateToken, getBookById);
router.put("/:id",authenticateToken, isAdmin, uploadMiddleware, updateBook);
router.delete("/:id",authenticateToken, isAdmin, removeBook);

export default router;