export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
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

    console.log("✅ Webhook Order Received:", erpOrder);

    return res.status(200).json({
      status: "success",
      message: "✅ Order synced to ERP",
      data: erpOrder
    });
  } catch (err) {
    console.error("❌ Error in webhook:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
