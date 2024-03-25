const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/getProducts").get(getProducts);
router.route("/createProduct").post(createProduct);
router.route("/getProduct/:id").get(getProduct).delete(deleteProduct);
router.route("/updateProduct/:id").put(updateProduct);

module.exports = router;
