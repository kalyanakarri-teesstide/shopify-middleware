// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  erp_order_id: String,
  customer_name: String,
  items: [
    {
      name: String,
      qty: Number
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
