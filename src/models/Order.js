const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shop: String,
  orderId: String,
  data: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
