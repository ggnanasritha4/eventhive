import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug Log
console.log("eventRoutes loaded:", typeof eventRoutes);

// Test Routes
app.get("/", (req, res) => {
  res.send("🚀 EventHive Backend Running");
});

app.get("/test", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is working",
  });
});

// Direct Events Test Route
app.get("/api/events", (req, res) => {
  res.json({
    message: "Direct route working",
  });
});

// API Routes
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:");
    console.error(error);
  });

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});