const axios = require("axios");
const { log, error } = require('../logger');
const ERP_ENDPOINT_URL = process.env.ERP_ENDPOINT_URL;

const sendToERP = async (order) => {
  try {
    const response = await axios.post(ERP_ENDPOINT_URL, order, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    log("ERP Response:", response.status, response.statusText);
    return response;
  } catch (error) {
    error("ERP API Error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = { sendToERP };
