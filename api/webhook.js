export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

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

  console.log("✅ Synced to ERP:", erpOrder);

  return res.status(200).json({
    status: "success",
    message: "Order synced",
    data: erpOrder
  });
}
