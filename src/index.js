require('dotenv').config();
const { fetchShopifyOrders } = require('./services/shopifyService');
const { sendToERP } = require('./services/erpService');
const logger = require('./utils/logger');

(async () => {
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
  } catch (err) {
    logger.error('❌ Error syncing orders:', err.message);
  }
})();
