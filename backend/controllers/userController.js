import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/errorResponse.js";

// Product Model
import User from "../models/User.js";

// @desc  Auth user & get token
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
      token: null,
    });
  } else {
    res.status(401);
    return next(new ErrorResponse("Invalid mail or password"));
  }
});
