const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getCategories,
  getProductByCategory,
} = require("../controllers/productController");
const { verifyJWT } = require("../middleware/auth");

const router = express.Router();

router.route("/getProducts").get(getProducts);
router.route("/createProduct").post(verifyJWT, createProduct);
router.route("/getProduct/:id").get(getProduct).delete(deleteProduct);
router.route("/updateProduct/:id").put(updateProduct);
router.route("/getProducts/categories").get(getCategories);
router.route("/getProducts/category/:category").get(getProductByCategory);

module.exports = router;
