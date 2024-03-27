const express = require("express");
const { verifyJWT } = require("../middleware/auth");
const {
  getCart,
  createCart,
  deleteCart,
} = require("../controllers/cartController");

const router = express.Router();

router
  .route("/cart")
  .get(verifyJWT, getCart)
  .post(verifyJWT, createCart)
  .delete(verifyJWT, deleteCart);

module.exports = router;
