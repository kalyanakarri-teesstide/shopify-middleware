export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('✅ Webhook received:', req.body);

    return res.status(200).json({
      status: "success",
      message: "Webhook received successfully",
      order: req.body
    });
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
