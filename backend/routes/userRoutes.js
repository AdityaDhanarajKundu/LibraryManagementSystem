// routes the http requests for user related endpoints

import express from "express";
import {registerUser, loginUser, updateUser} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update",authenticateToken, updateUser);

export default router;