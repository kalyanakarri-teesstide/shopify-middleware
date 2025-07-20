require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./utils/db');
const webhookRoutes = require('./webhook');
const Order = require('./models/order'); // <-- add this

const app = express();
const PORT = process.env.PORT || 10000;

// Connect to MongoDB
connectDB();

// Allow frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://shopify-frontend-lkb7.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(bodyParser.json());

// Routes
app.use('/', webhookRoutes);

// New GET orders route
app.get('/api/shopify/order', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

app.get('/', (req, res) => {
  res.send('Shopify Middleware is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
