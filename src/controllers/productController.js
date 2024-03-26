const Product = require("../models/productModel");
const { asyncHandler } = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({ success: true, product: products });
});

const createProduct = asyncHandler(async (req, res, next) => {
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    return next(new ErrorHandler(400, "All fields are required"));
  }
  await Product.create({
    title,
    description,
    price,
  });
  return res
    .status(201)
    .json({ success: true, message: "Product added successfully" });
});

const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  return res.status(200).json({ success: true, product });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

  return res
    .status(200)
    .json({ success: true, message: "Product Updated Successfully" });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  await Product.deleteOne(product);
  return res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};
