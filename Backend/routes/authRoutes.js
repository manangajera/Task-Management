// routes/authRoutes.js
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../config/uploadImage.js";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/authController.js";

const route = express.Router();

route.post("/register", upload.single("image"), registerUser);
route.post("/login", loginUser);
route.post("/logout", protect, logoutUser);
route.get("/profile", protect, getUserProfile);
route.put("/profile", protect, upload.single("image"), updateUserProfile);

export default route;
