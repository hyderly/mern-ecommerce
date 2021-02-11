import express from "express";
import dotenv from "dotenv";

import errorHanlder from "./middlewares/errorHandler.js";

import connectDB from "./config/db.js";

// Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// body parser
app.use(express.json());

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.json("API running ...");
});

// Routes Middleware
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// ErrorHandler Custom Middleware
// Always put after routes
app.use(errorHanlder);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running on ${process.env.NODE_ENV} environment at port ${process.env.PORT}`
  )
);
