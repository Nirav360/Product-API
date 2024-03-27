const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const ApiResponse = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

const getCart = asyncHandler(async (req, res, next) => {
  const owner = req.user._id;
  try {
    const cart = await Cart.findOne({ owner });
    if (cart && cart.products.length > 0) {
      return res.status(200).json({ cart });
    } else {
      return next(new ErrorHandler(404, "No Products Added"));
    }
  } catch (error) {
    return next(new ErrorHandler(500, error?.data?.message));
  }
});

const createCart = asyncHandler(async (req, res, next) => {
  const owner = req.user._id;
  const { itemId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ owner });
    const item = await Product.findOne({ _id: itemId });
    if (!item) {
      return next(new ErrorHandler(404, "Item not found"));
    }
    const price = item.price;
    const title = item.title;
    const thumbnail = item.thumbnail;
    //If cart already exists for user,
    if (cart) {
      const itemIndex = cart.products.findIndex(
        (item) => item.itemId === itemId
      );
      //check if product exists increase the quantity by 1 and update the bill
      if (itemIndex > -1) {
        let product = cart.products[itemIndex];
        product.quantity += quantity;
        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
        cart.products[itemIndex] = product;
        await cart.save();
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              cart,
              "Product Quantity is incremented by 1 in cart"
            )
          );
      } else {
        // if product does not exist in cart for the user add the product in cart
        cart.products.push({ itemId, title, quantity, price, thumbnail });
        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
        await cart.save();
        return res
          .status(201)
          .json(
            new ApiResponse(201, cart, "Product added in cart successfully")
          );
      }
    } else {
      //no cart exists, create one
      const newCart = await Cart.create({
        owner,
        products: [{ itemId, title, quantity, price, thumbnail }],
        bill: quantity * price,
      });
      return res
        .status(201)
        .json(
          new ApiResponse(201, newCart, "Product added in cart successfully")
        );
    }
  } catch (error) {
    return next(new ErrorHandler(500, "Something went wrong"));
  }
});

const deleteCart = asyncHandler(async (req, res, next) => {
  const owner = req.user._id;
  const itemId = req.query.itemId;
  let cart = await Cart.findOne({ owner });

  const itemIndex = cart.products.findIndex((item) => item.itemId === itemId);

  if (itemIndex > -1) {
    let item = cart.products[itemIndex];
    cart.bill -= item.quantity * item.price;
    if (cart.bill < 0) {
      cart.bill = 0;
    }
    cart.products.splice(itemIndex, 1);
    cart.bill = cart.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    await cart.save();

    return res.status(200).json({
      success: true,
      message: `${item.title} deleted from cart successfully`,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: `Product not found`,
    });
  }
});

module.exports = { getCart, createCart, deleteCart };
