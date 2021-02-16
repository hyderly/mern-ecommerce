import ErrorResponse from "../utils/errorResponse.js";
import generateToken from "../utils/generateToken.js";

import asyncHandler from "../middlewares/async.js";

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
    throw new Error("Invalid mail or password");
  }
});

// @desc  Register a new user
// @route POST /api/users/register
// @access public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existsUser = await User.findOne({ email: email });

  if (existsUser) {
    return next(new ErrorResponse("User already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid mail or password");
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
    res.status(401);
    throw new Error("User not found");
  }
});
