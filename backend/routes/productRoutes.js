import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";

import ErrorResponse from "../utils/errorResponse.js";

// Models
import Product from "../models/Product.js";

// @desc Fetch all products
// @route GET /api/products
// @access public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
  })
);

// @desc Fetch single products
// @route GET /api/products/:id
// @access public
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      return next(
        new ErrorResponse(`Product not found with id ${req.params.id}`, 400)
      );
    }
  })
);

export default router;
