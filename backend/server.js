import express from "express";
import dotenv from "dotenv";

import products from "./products.js";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("API running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(product => product._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running on ${process.env.NODE_ENV} environment at port ${process.env.PORT}`
  )
);
