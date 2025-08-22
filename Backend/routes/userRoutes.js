import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import { deleteUser, getUserById, getUsers } from "../controllers/userController.js";

const router = express.Router();

// User Management Routes
router.get("/all", protect, adminOnly, getUsers); 
router.get("/:id", protect, getUserById);  
router.delete("/:id", protect, adminOnly, deleteUser); 
export default router;
