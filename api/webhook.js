// api/webhook.js

const { sendToERP } = require('../services/erpService');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const order = req.body;

    const erpOrder = {
      erp_order_id: order.id,
      customer_name: `${order.customer?.first_name ?? ''} ${order.customer?.last_name ?? ''}`,
      items: order.line_items.map(item => ({
        name: item.title,
        qty: item.quantity
      })),
      total: order.total_price
    };

    console.log("Received Order:", erpOrder);
    const erpResponse = await sendToERP(erpOrder);
    console.log("Sent to ERP:", erpResponse.data);

    return res.status(200).json({ message: 'Order synced successfully', data: erpOrder });
  } catch (err) {
    console.error("Sync Failed:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
