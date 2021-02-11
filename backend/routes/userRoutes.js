import express from "express";
const router = express.Router();

// User controller method
import { authUser, getUserProfile } from "../controllers/userController.js";

// User protected route
import { protectRoute } from "../middlewares/authMiddleware.js";

router.route("/login").post(authUser);
router.route("/profile").get(protectRoute, getUserProfile);

export default router;
