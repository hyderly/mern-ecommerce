import express from "express";
import dotenv from "dotenv";

import errorHanlder from "./middlewares/errorHandler.js";

import connectDB from "./config/db.js";

// Routes
import productRoute from "./routes/productRoutes.js";

const app = express();

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.json("API running ...");
});

// Routes Middleware
app.use("/api/products", productRoute);

// ErrorHandler Custom Middleware
app.use(errorHanlder);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running on ${process.env.NODE_ENV} environment at port ${process.env.PORT}`
  )
);
