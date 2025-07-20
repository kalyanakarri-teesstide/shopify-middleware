# Shopify Middleware Service

A full-stack Node.js and React-based middleware system that receives Shopify orders via webhook, transforms them, stores them in memory, and forwards them to a mock ERP system (Webhook.site). A simple React frontend is used to display the synced orders.

---

## 🔧 Features

- Receives orders from Shopify webhooks (`/webhook`)
- Transforms them to ERP-compatible JSON format
- Sends them to ERP via `POST` (to a mock Webhook.site endpoint)
- Stores synced orders in memory
- Exposes `/orders` API to view synced orders
- Frontend dashboard displays orders (React, Toast notifications, nice UI)
- CORS setup for both local and deployed clients

---

## 🛠 How to Run the Project

### 🔙 Backend (Express API)

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/shopify-middleware.git
   cd shopify-middleware

2.Install dependencies:
  npm install

3.Create .env file with this:
  ERP_ENDPOINT_URL=https://webhook.site/your-id  (https://webhook.site/)

4.Start backend:
  npm run dev


 ### Sample Input (from Shopify Webhook)
 {
  "id": 5597583278132,
  "customer": {
    "first_name": "Kalyana",
    "last_name": "Karri"
  },
  "line_items": [
    {
      "title": "Test Product 1",
      "quantity": 1
    }
  ],
  "total_price": "100.00"
}

 ##### Transformed Output (sent to ERP)
{
  "erp_order_id": 5597583278132,
  "customer_name": "Kalyana Karri",
  "items": [
    { "name": "Test Product 1", "qty": 1 }
  ],
  "total": "100.00"
}
