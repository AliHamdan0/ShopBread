const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connection = require('./config/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const errorHandler = require('./middlewares/errorHandler');
const userRouter = require('./routes/user');
const recipesRouter = require('./routes/recipes');
const productRouter = require('./routes/products');
const blogRouter = require('./routes/blogs');
const orderRouter = require('./routes/order');
const checkoutRouter = require('./routes/checkout');

const app = express();
const Port = process.env.PORT || 7000;

connection();
app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});

app.use(cors());
app.use(express.json());
app.use('/public/images/recipes', express.static('public/images/recipes'));
app.use('/public/images/products', express.static('public/images/products'));
app.use('/public/images/blogs', express.static('public/images/blogs'));
app.use('/public/images/upload', express.static('public/images/upload'));
app.use('/api', userRouter);
app.use('/api', recipesRouter);
app.use('/api', productRouter);
app.use('/api', blogRouter);
app.use('/api', orderRouter);
app.use('/api', checkoutRouter);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
