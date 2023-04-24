const Products = require('../models/product');
const asyncHandler = require('express-async-handler');

// get all products
//filter on name, price,date,category
// GET /products
// private
const getAllProducts = asyncHandler(async (req, res) => {
  const { filters } = req;
  // const userId = req.user._id;
  const page = parseInt(req.query.page) - 1 || 0;
  let size = 5;
  let products = await Products.find(filters)
    .skip(page * size)
    .limit(size)
    .lean();
  const count = await Products.find(filters).count();
  // CheckedForUser(products, userId);
  res.status(200).json({ products, count });
});

// get top 8 products
//sort on number of sales
// GET /topSalesProducts
// private
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Products.find().sort({ numberOfSales: -1 }).limit(8);
  res.status(200).json({ products });
});

//check if this product exists in the cart items of this user
const CheckedForUser = (products, userId) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]?.checkedUser?.find((item) => item == userId.toString())) {
      products[i].checked = true;
    } else products[i].checked = false;
  }
};

module.exports = {
  getAllProducts,
  getTopProducts,
};
