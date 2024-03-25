const express = require("express");
const router = express.Router();

const {
  loginUser,
  logoutUser,
  registerUser,
} = require("../controllers/userController.js");
const { verifyJWT } = require("../middleware/auth.js");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);

module.exports = router;