import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

configDotenv();
const app = express();

// cors 
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json())
const PORT = process.env.PORT
app.listen(PORT,()=>console.log("Server is started on the port:",PORT))