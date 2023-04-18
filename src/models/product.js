const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'general',
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date().toISOString(),
  },
  description: {
    type: String,
  },
  numberOfSales: {
    type: Number,
  },
  checkedUser: {
    type: [],
  },
});

module.exports = mongoose.model('Products', productSchema);
