const { Router } = require('express');
const { getAllOrders, postOrder } = require('../controllers/order');
const validateToken = require('../middlewares/validateTokenHandler');

const orderRouter = Router();
orderRouter.use(validateToken);

orderRouter.get('/orders', getAllOrders);
orderRouter.post('/orders', postOrder);

module.exports = orderRouter;
