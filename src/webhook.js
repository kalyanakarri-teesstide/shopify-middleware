require('dotenv').config();
const express = require('express');
const router = express.Router();
const Order = require('./models/Order');

const { log } = require('./utils/logger');

router.post('/webhook', express.json(), async (req, res) => {
  const order = req.body;

  const erpOrder = {
    erp_order_id: order.id,
    customer_name: `${order.customer?.first_name ?? ''} ${order.customer?.last_name ?? ''}`,
    items: order.line_items?.map(item => ({
      name: item.title,
      qty: item.quantity
    })),
    total: order.total_price
  };

  try {
    const savedOrder = await Order.create(erpOrder);
    log("Order saved:", savedOrder);
    res.status(200).json({ message: "Order received and saved", order: savedOrder });
  } catch (err) {
    console.error("Error saving order to MongoDB:", err);
    res.status(500).json({ message: "Error saving order" });
  }
});

// API to get all orders for frontend
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

module.exports = router;
