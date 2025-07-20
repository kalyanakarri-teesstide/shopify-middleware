// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendToERP } = require('./services/erpService');
require('dotenv').config();
const { log, error } = require('../utils/logger');
const app = express();
const PORT = process.env.PORT || 10000;

// Allow both local and deployed frontend URLs
const allowedOrigins = [
  'http://localhost:3000',
  'https://shopify-frontend-lkb7.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

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

  log("Webhook Received. Sending this to ERP:", erpOrder);

  try {
    const response = await sendToERP(erpOrder);
    log('ERP API Success:', response.statusText);

    syncedOrders.push(erpOrder); // save for GET /orders

    res.status(200).json({
      status: 'success',
      message: 'Order synced to ERP',
      data: erpOrder
    });
  } catch (error) {
    error('Failed to sync to ERP:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'Failed to sync order to ERP'
    });
  }
});

// This is the route frontend calls
app.get('/orders', (req, res) => {
  res.status(200).json(syncedOrders);
});

app.get('/', (req, res) => {
  res.send('Shopify Middleware is running.');
});

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});
