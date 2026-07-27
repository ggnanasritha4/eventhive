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


// Routes

app.use("/api/events", eventRoutes);

app.use("/api/registrations", registrationRoutes);

app.use("/api/auth", authRoutes);



// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB connected successfully");

  })
  .catch((error) => {

    console.log(
      "MongoDB connection error:",
      error
    );

  });



// Server

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});