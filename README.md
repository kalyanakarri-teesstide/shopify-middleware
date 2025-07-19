# Shopify Middleware Service

A Node.js-based middleware that fetches orders from a Shopify store and pushes them to a mock ERP system via a webhook URL.

---

## 🔧 How It Works

- Fetches Shopify orders using REST API (`orders.json`)
- Transforms the orders to ERP format:
```json
{
  "erp_order_id": 5597583278132,
  "customer_name": "Kalyana Karri",
  "items": [
    { "name": "Test Product 1", "qty": 1 }
  ],
  "total": "100.00"
}
