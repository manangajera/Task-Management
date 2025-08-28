import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import ConnectDb from "./config/ConnectDb.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
configDotenv();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // add this if you need cookies/tokens
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server is started on the port:", PORT));
ConnectDb();
