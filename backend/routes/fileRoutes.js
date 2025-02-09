// handles the routing for file related http requests

import express from "express";
import { uploadBook, downloadBook } from "../controllers/filesController.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/filesMiddleware.js";

const router = express.Router();

// route to upload an existing book or upload a completely new book
router.post("/upload/:bookId?", authenticateToken, isAdmin, uploadMiddleware,uploadBook);
// route to download an existing book
router.get("/download/:bookId", authenticateToken ,downloadBook);

export default router;
