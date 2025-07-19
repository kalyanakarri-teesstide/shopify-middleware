// api/webhook.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received webhook:', req.body);

    // Sample response
    res.status(200).json({
      status: 'success',
      message: 'Webhook received',
      received: req.body
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
