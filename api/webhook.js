// api/webhook.js

import { fetchShopifyOrders } from '../src/services/shopifyService.js';
import { sendToERP } from '../src/services/erpService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const orders = await fetchShopifyOrders();

    const results = [];

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

      const response = await sendToERP(erpOrder);
      results.push({
        order_id: erpOrder.erp_order_id,
        erp_response: response.data
      });
    }

    res.status(200).json({ message: '✅ Orders Synced', results });

  } catch (err) {
    console.error('❌ Error syncing orders:', err.message);
    res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}
