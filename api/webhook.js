// api/webhook.js

import { fetchShopifyOrders } from '../src/services/shopifyService.js';
import { sendToERP } from '../src/services/erpService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const orders = await fetchShopifyOrders();

    const synced = [];

    for (const order of orders) {
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

      synced.push({
        id: erpOrder.erp_order_id,
        erp_response: response.data
      });
    }

    return res.status(200).json({
      status: '✅ Synced',
      count: synced.length,
      synced
    });

  } catch (err) {
    console.error('❌ Error syncing:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
