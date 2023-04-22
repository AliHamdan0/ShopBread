const { Router } = require('express');
const { getAllProducts, getTopProducts } = require('../controllers/products');
const validateToken = require('../middlewares/validateTokenHandler');
const productFilter = require('../middlewares/productFilter');

const productRouter = Router();
// productRouter.use(validateToken);

productRouter.get('/products', productFilter, getAllProducts);
productRouter.get('/topProducts', getTopProducts);

module.exports = productRouter;
