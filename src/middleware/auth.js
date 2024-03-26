const ErrorHandler = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const { asyncHandler } = require("../utils/asyncHandler");

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new ErrorHandler(401, "Unauthorized request"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new ErrorHandler(401, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return next(new ErrorHandler(401, "Invalid Access Token"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(
      new ErrorHandler(401, error?.message || "Invalid access token")
    );
  }
});

module.exports = { verifyJWT };
