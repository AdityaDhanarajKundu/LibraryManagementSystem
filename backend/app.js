import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import { dashBoardStats } from "./controllers/userController.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { getRecentActivities } from "./controllers/transactionController.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/files", fileRoutes);
app.get("/api/dashboard", authenticateToken, dashBoardStats);
app.get("/api/recent-activities", authenticateToken, getRecentActivities);
// static files serving
app.use("/uploads", express.static("uploads/books"));
app.use("uploads/thumbnails", express.static("uploads/thumbnails"));  

export default app;