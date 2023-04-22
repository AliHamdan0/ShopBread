const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  quantities: { type: [{ productId: String, quantity: Number }] },
});

module.exports = mongoose.model('Checkout', CheckoutSchema);
