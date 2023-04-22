const Checkouts = require('../models/checkout');
const Products = require('../models/product');
const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');

// get checkout list
// GET /cartItems
// private
const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await Checkouts.find({ userId }, { items: 1 }).lean();
  if (!cart) {
    res.status(200).json({ cart: [] });
  }
  res.status(200).json({ cart: cart });
});

// post a new item to cart list
// Post /cartItem
// private
const postCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  let usersItems = await Checkouts.findOne({ userId });
  if (!usersItems) {
    ///create a record for this user
    usersItems = await Checkouts.create({
      userId,
      items: [{ ...req.body }],
    });
    if (usersItems) {
      res.status(201).json({ msg: 'added successfully' });
      addUserToCheckedUsers(productId, userId);
    } else {
      res.status(500);
      throw new Error('could not register a new item');
    }
  } else {
    let newChecklist;
    const isItemExist = await Checkouts.findOne({
      userId,
      items: { $elemMatch: { productId: new ObjectId(productId) } },
    });
    if (isItemExist) {
      newChecklist = await Checkouts.findOneAndUpdate(
        {
          userId,
        },
        { $inc: { 'items.$[item].quantity': req.body.quantity } },
        { arrayFilters: [{ 'item.productId': new ObjectId(productId) }] }
      );
    } else {
      newChecklist = await Checkouts.findOneAndUpdate(
        {
          userId,
        },
        { $push: { items: { ...req.body } } }
      );
    }
    if (newChecklist) {
      res.status(200).json({ msg: 'added successfully' });
      if (!isItemExist) addUserToCheckedUsers(productId, userId);
    } else {
      res.status(500);
      throw new Error('could not register a new item');
    }
  }
});

// put an item in the cart list
// PUT /cartItem
// private
const putCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const newChecklist = await Checkouts.findOneAndUpdate(
    {
      userId,
    },
    { $set: { 'items.$[item].quantity': quantity } },
    { arrayFilters: [{ 'item.productId': new ObjectId(productId) }] }
  );
  if (newChecklist) res.status(200).json({ msg: 'updated successfully' });
  else {
    res.status(500);
    throw new Error('could not update the item');
  }
});

// Delete an item in the cart list
// PUT /cartItem
// private
const deleteCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  const newChecklist = await Checkouts.findOneAndUpdate(
    {
      userId,
    },
    { $pull: { items: { productId: new ObjectId(productId) } } }
  );
  if (newChecklist) {
    res.status(200).json({ msg: 'removed successfully' });
    removeUserToCheckedUsers(productId, userId);
  } else {
    res.status(500);
    throw new Error('could not update the item');
  }
});

const addUserToCheckedUsers = async (productId, userId) => {
  const product = await Products.findByIdAndUpdate(productId, {
    $push: { checkedUser: userId.toString() },
  });
};

const removeUserToCheckedUsers = async (productId, userId) => {
  const product = await Products.findByIdAndUpdate(productId, {
    $pull: { checkedUser: userId.toString() },
  });
};

module.exports = {
  getCartItems,
  postCartItem,
  putCartItem,
  deleteCartItem,
};
