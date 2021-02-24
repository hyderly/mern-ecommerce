import asyncHandler from "../middlewares/async.js";

// Product Model
import Product from "../models/Product.js";

// @desc Fetch all products
// @route GET /api/products
// @access public

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error("Products Not Found");
  }
});

// @desc Fetch single products
// @route GET /api/products/:id
// @access public

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error(`Product not found with id ${req.params.id}`);
  }
});
