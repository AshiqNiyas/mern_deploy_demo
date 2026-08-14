import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "AI Notes API is running",
  });
});

// API routes
app.use("/api/notes", noteRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});