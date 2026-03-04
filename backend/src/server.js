import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/products/upload", uploadRouter);
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Ping UptimeRobot OK" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
