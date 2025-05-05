import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import allRoutes from "./routes/routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.use("/api", allRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
