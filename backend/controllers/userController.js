import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/errorResponse.js";
import generateToken from "../utils/generateToken.js";

// Product Model
import User from "../models/User.js";

// @desc  Authenticate user & get token
// @route POST /api/users/login
// @access public
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    return next(new ErrorResponse("Invalid mail or password"));
  }
});

// @desc  Get user profile
// @route GET /api/users/profile
// @access private

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return next(new ErrorResponse("Invalid Email or Password", 401));
  }
});
