import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/errorResponse.js";

// Product Model
import Product from "../models/Product.js";

// @desc Fetch all products
// @route GET /api/products
// @access public

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc Fetch single products
// @route GET /api/products/:id
// @access public

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    return next(
      new ErrorResponse(`Product not found with id ${req.params.id}`, 400)
    );
  }
});
