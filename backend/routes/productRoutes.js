import express from "express";
const router = express.Router();

// Product Controller methods
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

// User/Admin protected route
import {
  protectRoute,
  adminProtectRoute,
} from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(getProducts)
  .post(protectRoute, adminProtectRoute, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(protectRoute, adminProtectRoute, deleteProduct)
  .put(protectRoute, adminProtectRoute, updateProduct);

export default router;
