import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/errorResponse.js";

// Product Model
import User from "../models/User.js";

// @desc  Auth user & get token
// @route POST /api/users/login
// @access public

export const authUser = asyncHandler(async (req, res) => {
  const data = req.body;
  res.status(400, {
    success: true,
    data,
  });
});
