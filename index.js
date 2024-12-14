import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import usersRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoriesRouter from "./routes/categoriesRoutes.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

// CORS middleware to allow only the specified origins
app.use(
  cors({
    origin: [
      "https://eduwork-admin-technical-test.vercel.app", // Correct the origin without trailing slash
      "http://localhost:5173", // Allow local development URL
    ],
  })
);

app.use(express.json());

// Connect to the database
connectDB();

// API Routes
app.use("/api/user", usersRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoriesRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
