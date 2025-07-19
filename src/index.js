// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
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

  console.log("Webhook Received. Sending this to ERP:", erpOrder);

  // Simulate sending to ERP here
  res.status(200).json({ status: 'success', message: 'Order synced to ERP' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
