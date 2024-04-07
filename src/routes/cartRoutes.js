const express = require("express");
const { verifyJWT } = require("../middleware/auth");
const {
  getCart,
  createCart,
  deleteCart,
} = require("../controllers/cartController");

const router = express.Router();

router.use(verifyJWT);

router.route("/cart").get(getCart).post(createCart).delete(deleteCart);

module.exports = router;
