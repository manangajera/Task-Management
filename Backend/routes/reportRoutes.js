import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import { exportTaskReport, exportUserReport } from "../controllers/reportController.js";

const route = express.Router();

route.get("/export/tasks", exportTaskReport);
route.get("/export/users", protect, adminOnly, exportUserReport);

export default route;
