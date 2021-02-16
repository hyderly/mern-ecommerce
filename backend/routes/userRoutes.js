import express from "express";
const router = express.Router();

// User controller method
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

// User protected route
import { protectRoute } from "../middlewares/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

export default router;
