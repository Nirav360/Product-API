const express = require("express");
const router = express.Router();

const {
  loginUser,
  logoutUser,
  registerUser,
  refresh,
} = require("../controllers/userController.js");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").get(refresh);
router.route("/logout").post(logoutUser);

module.exports = router;
