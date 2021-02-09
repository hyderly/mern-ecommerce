import express from "express";
const router = express.Router();

// Product Controller methods
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);



export default router;
