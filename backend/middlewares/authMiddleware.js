import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";

export const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      return next(new ErrorResponse("Invalid Token", 401));
    }
  }

  if (!token) {
    return next(new ErrorResponse("Invalid Request", 401));
  }
});
