import generateToken from "../utils/generateToken.js";

import asyncHandler from "../middlewares/async.js";

// Product Model
import User from "../models/User.js";

// @desc  Authenticate user & get token
// @route POST /api/users/login
// @access public
export const authUser = asyncHandler(async (req, res) => {
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
    res.status(400);
    throw new Error("User already exists");
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

// @desc  Update user profile
// @route PUT /api/users/profile
// @access private

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// @desc  Get all users
// @route GET /api/users
// @access Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(401);
    throw new Error("Users not found");
  }
});

// @desc  Detele User
// @route DELETE /api/users/:id
// @access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user.isAdmin) {
    await user.remove();
    res.json(`${user.name} User removed`);
  }
  if (user.isAdmin) {
    res.status(404);
    throw new Error("User admin Cannot be deleted");
  } else {
    res.status(404);
    throw new Error("User is Admin or User not found");
  }
});
