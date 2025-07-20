const axios = require('axios');
const { log, error } = require('../utils/logger');
const fetchShopifyOrders = async () => {
  const { SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD, SHOPIFY_STORE_NAME } = process.env;

  const url = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2023-04/orders.json?status=any&limit=5`;

  log("Shopify API URL:", url);

  try {
    const res = await axios.get(url);
    log("Orders fetched:", res.data.orders.length);
    return res.data.orders;
  } catch (error) {
    error('Error fetching Shopify orders:', error.message);
    if (error.response) {
      error('Shopify API response:', error.response.data);
    }
    throw error;
  }
};

module.exports = { fetchShopifyOrders };
