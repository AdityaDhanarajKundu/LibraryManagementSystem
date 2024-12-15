// routes the http requests for book related endpoints

import express from "express";
import { getAllBooks, getBookById, addBook, getBooksByGenre } from "../controllers/bookController.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/filesMiddleware.js";

const router = express.Router();

router.get("/",authenticateToken, getAllBooks);
router.get("/categories",authenticateToken, getBooksByGenre);
router.get("/:id",authenticateToken, getBookById);
router.post("/",authenticateToken, isAdmin, uploadMiddleware, addBook);

export default router;