const Product = require("../models/productModel");
const { asyncHandler } = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  const productsWithTrendingFlag = products.map((product) => ({
    ...product.toObject(),
    trendingProduct: product.rating > 4.5 ? true : false,
  }));
  return res
    .status(200)
    .json({ success: true, products: productsWithTrendingFlag });
});

const createProduct = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    price,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;

  if (
    !title ||
    !description ||
    !price ||
    !stock ||
    !brand ||
    !category ||
    !thumbnail ||
    !Array.isArray(images)
  ) {
    return next(new ErrorHandler(400, "All fields are required"));
  }
  await Product.create({
    ...req.body,
    owner: req.user._id,
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

const getCategories = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}, "category");
  const categories = products.map((product) => product.category);
  const uniqueCategory = [...new Set(categories)];
  return res.status(200).json(uniqueCategory);
});

const getProductByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  return res.status(200).json({ products });
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getCategories,
  getProductByCategory,
};
