import express from "express";
const router = express.Router();

// User controller method
import { authUser } from "../controllers/userController.js";

router.route("/login").post(authUser);

export default router;
