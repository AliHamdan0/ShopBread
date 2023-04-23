const Orders = require('../models/order');
const Products = require('../models/product');
const checkout = require('../models/checkout');
const asyncHandler = require('express-async-handler');

// get all orders
//sort on latest
// GET /orders
// private
const getAllOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) - 1 || 0;
  let size = 8;
  let count;
  const orders = await Orders.find({ userId })
    .skip(page * size)
    .limit(size)
    .sort({ date: -1 });
  count = await Orders.find({ userId }).count();
  if (!orders) {
    res.status(500);
    throw new Error('could not get the orders from the database');
  }
  res.status(200).json({ orders, count });
});

// post a new order
// Post /order
// private
const postOrder = asyncHandler(async (req, res) => {
  const { date, items, totalPrice } = req.body;
  const userId = req.user._id;
  let orderNumber = await Orders.findOne().count();
  orderNumber++;
  if (!date || !items || !totalPrice) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }
  const newOrders = await Orders.create({
    userId: userId,
    orderNumber: orderNumber,
    ...req.body,
  });
  if (newOrders) {
    res.status(200).json({ newOrders });
    addProductNumber(items);
    const clearCart = await checkout.findOneAndDelete({ userId });
  } else {
    res.status(500);
    throw new Error('could not register a new order');
  }
});

const addProductNumber = async (items) => {
  for (let i = 0; i < items.length; i++) {
    const updateProduct = await Products.findByIdAndUpdate(items[i], {
      $inc: { numberOfSales: 1 },
    });
  }
};

module.exports = {
  getAllOrders,
  postOrder,
};
