const ErrorHandler = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const { asyncHandler } = require("../utils/asyncHandler");

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new ErrorHandler(401, "Unauthorized request"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new ErrorHandler(401, "Unauthorized request"));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    return next(
      new ErrorHandler(401, error?.message || "Invalid access token")
    );
  }
});

module.exports = { verifyJWT };
