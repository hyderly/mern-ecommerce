import express from "express";
const router = express.Router();

// Product Controller methods
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
// User protected route
// import { protectRoute } from "../middlewares/authMiddleware.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

router.route("/").post(protectRoute, createOrder);
router.route("/:id").get(protectRoute, getOrderById);
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);

export default router;
