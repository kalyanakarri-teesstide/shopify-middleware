const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { sendToERP } = require('./services/erpService');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
