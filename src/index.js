const express = require('express');
const app = express();
const webhookRoute = require('./webhook');

require('dotenv').config();

app.use(express.json());

// Your webhook endpoint
app.use('/webhook', webhookRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
