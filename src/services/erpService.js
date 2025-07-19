const axios = require('axios');

const sendToERP = async (orderData) => {
  const { ERP_ENDPOINT_URL } = process.env;

  try {
    const response = await axios.post(ERP_ENDPOINT_URL, orderData);
    return response;
  } catch (error) {
    console.error('❌ Error sending data to ERP:', error.message);
    throw error;
  }
};

module.exports = { sendToERP };
