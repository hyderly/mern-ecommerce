const express = require("express");
const products = require("./products");

const app = express();

app.get("/", (req, res) => {
  res.send("API running...");
});

app.get("/products/api", (req, res) => {
  res.json(products);
});

app.get("/products/api/:id", (req, res) => {
  const product = products.find(product => product._id === req.params.id);
  res.json(product);
});

app.listen(5000, console.log("server runng at port 5000"));
