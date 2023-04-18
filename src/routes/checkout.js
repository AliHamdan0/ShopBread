const { Router } = require('express');
const {
  getCartItems,
  postCartItem,
  putCartItem,
  deleteCartItem,
} = require('../controllers/checkout');
const validateToken = require('../middlewares/validateTokenHandler');

const checkoutRouter = Router();
checkoutRouter.use(validateToken);

checkoutRouter.get('/cartItems', getCartItems);
checkoutRouter.post('/cartItems', postCartItem);
checkoutRouter.put('/cartItems', putCartItem);
checkoutRouter.put('/removeCartItem', deleteCartItem);

module.exports = checkoutRouter;
