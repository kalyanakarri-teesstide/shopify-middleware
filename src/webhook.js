require('dotenv').config();
const express = require('express');
const router = express.Router();

router.post('/webhook', express.json(), (req, res) => {
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

  console.log("✅ Webhook received. Order:", erpOrder);

  res.status(200).json({ message: "✅ Order received", order: erpOrder });
});

module.exports = router;
