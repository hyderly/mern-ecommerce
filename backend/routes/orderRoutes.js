import express from "express";
const router = express.Router();

// Product Controller methods
import { createOrder } from "../controllers/orderController.js";
// User protected route
// import { protectRoute } from "../middlewares/authMiddleware.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

router.route("/").post(protectRoute, createOrder);

export default router;
