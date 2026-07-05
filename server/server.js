import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config(); // MUST BE FIRST

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Connect MongoDB
connectDB();

const app = express();

// =======================
// MIDDLEWARE
// =======================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// =======================
// ROUTES
// =======================

app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

// =======================
// ROOT
// =======================

app.get("/", (req, res) => {
  res.send("🚀 SmartCommerce AI Backend Running Successfully");
});

// =======================
// DEBUG
// =======================

console.log(
  "MONGO_URI:",
  process.env.MONGO_URI ? "Loaded ✅" : "Missing ❌"
);

console.log(
  "GROQ_API_KEY:",
  process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌"
);

console.log(
  "JWT_SECRET:",
  process.env.JWT_SECRET ? "Loaded ✅" : "Missing ❌"
);

// =======================
// SERVER
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});