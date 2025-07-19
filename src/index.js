// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const { sendToERP } = require('./services/erpService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

const syncedOrders = []; // in-memory

app.post('/webhook', async (req, res) => {
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

  try {
    const response = await sendToERP(erpOrder);
    console.log('ERP API Success:', response.statusText);

    syncedOrders.push(erpOrder); // save for GET /orders

    res.status(200).json({
      status: 'success',
      message: 'Order synced to ERP',
      data: erpOrder
    });
  } catch (error) {
    console.error('Failed to sync to ERP:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'Failed to sync order to ERP'
    });
  }
});

// This is the route  frontend calls
app.get('/orders', (req, res) => {
  res.status(200).json(syncedOrders);
});

app.get('/', (req, res) => {
  res.send('Shopify Middleware is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
