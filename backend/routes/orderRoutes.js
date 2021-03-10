import express from "express";
const router = express.Router();

// Product Controller methods
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";
// User protected route
// import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  protectRoute,
  adminProtectRoute,
} from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(protectRoute, createOrder)
  .get(protectRoute, adminProtectRoute, getAllOrders);
router.route("/myorders").get(protectRoute, getMyOrders);
router.route("/:id").get(protectRoute, getOrderById);
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);

export default router;
