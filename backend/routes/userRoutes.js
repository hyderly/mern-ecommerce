import express from "express";
const router = express.Router();

// User controller method
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

// User protected route
import {
  protectRoute,
  adminProtectRoute,
} from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(registerUser)
  .get(protectRoute, adminProtectRoute, getAllUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);
router
  .route("/:id")
  .delete(protectRoute, adminProtectRoute, deleteUser)
  .get(protectRoute, adminProtectRoute, getUserById)
  .put(protectRoute, adminProtectRoute, updateUser);

export default router;
