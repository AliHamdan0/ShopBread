const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  items: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model('Checkout', CheckoutSchema);
