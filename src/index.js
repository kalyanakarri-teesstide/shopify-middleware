require('dotenv').config();
const express = require('express');
const { fetchShopifyOrders } = require('./services/shopifyService');
const { sendToERP } = require('./services/erpService');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const orders = await fetchShopifyOrders();

    for (let order of orders) {
      const erpOrder = {
        erp_order_id: order.id,
        customer_name: `${order.customer?.first_name ?? ''} ${order.customer?.last_name ?? ''}`,
        items: order.line_items.map(item => ({
          name: item.title,
          qty: item.quantity
        })),
        total: order.total_price
      };

      console.log("Sending this order to ERP:", erpOrder);
      const response = await sendToERP(erpOrder);
      logger.log('✅ Synced Order:', erpOrder.erp_order_id);
      logger.log('ERP Response:', response.data);
    }

    res.send('✅ Orders synced to ERP.');
  } catch (err) {
    logger.error('❌ Error syncing orders:', err.message);
    res.status(500).send('❌ Error syncing orders.');
  }
});

// Render needs a running server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
