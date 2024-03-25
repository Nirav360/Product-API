const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
};
const createProduct = async (req, res, next) => {
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    const err = new Error("All fields are mandatory");
    err.status = 400;
    return next(err);
  }
  await Product.create({
    title,
    description,
    price,
  });
  res.status(201).json({ message: "Product added successfully" });
};
const getProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }
  } catch (error) {
    return next(error);
  }
  return res.status(200).json(product);
};
const updateProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }
  } catch (error) {
    return next(error);
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res.status(200).json(updatedProduct);
};
const deleteProduct = async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }
  } catch (error) {
    return next(error);
  }
  await Product.deleteOne(product);
  res.status(200).json({ message: `Deleted Successfully` });
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};
