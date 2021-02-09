import express from "express";
import dotenv from "dotenv";

import errorHanlder from "./middlewares/errorHandler.js";

import connectDB from "./config/db.js";

// Routes
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";

const app = express();

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.json("API running ...");
});

// body parser
app.use(express.json());

// Routes Middleware
app.use("/api/products", productRoute);

app.use("/api/users/login", userRoute);

// ErrorHandler Custom Middleware
app.use(errorHanlder);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running on ${process.env.NODE_ENV} environment at port ${process.env.PORT}`
  )
);
