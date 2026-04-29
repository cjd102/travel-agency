import express from "express";
import cors from "cors";
import { Database } from "./database";
import flightRoutes from "./routes/flights";
import userRoutes from "./routes/user";

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
Database.initialize();

// Routes
app.use("/api/flights", flightRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Travel agency backend running on port ${PORT}`);
});
