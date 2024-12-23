// routes the http requests for user related endpoints

import express from "express";
import {registerUser, loginUser, updateUser, makeAdmin, forgotPassword, resetPassword} from "../controllers/userController.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update",authenticateToken, updateUser);
router.put("/make-admin", authenticateToken, isAdmin, makeAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;