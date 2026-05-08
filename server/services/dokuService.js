const axios = require("axios");
const crypto = require("crypto");

const createInvoice = async (booking) => {
  const clientId = process.env.DOKU_CLIENT_ID;
  const secretKey = process.env.DOKU_SECRET_KEY;

  const requestId = Date.now().toString();

  const requestTimestamp = new Date()
    .toISOString()
    .slice(0, 19) + "Z";

  const targetPath = "/checkout/v1/payment";

  const body = {
    order: {
      invoice_number: `INV-${booking.id}`,
      amount: booking.totalPrice,
      currency: "IDR",
      callback_url:`https://evacuee-phony-unbroken.ngrok-free.dev/api/doku/callback?id=${booking.id}`,
      auto_redirect: true,
    },

    payment: {
      payment_due_date: 60,
    },

    customer: {
      id: `CUST-${booking.userId}`,
      name: "Rental Customer",
      email: "customer@gmail.com",
      phone: "08123456789",
    },
  };

  // digest
  const digest = crypto
    .createHash("sha256")
    .update(JSON.stringify(body))
    .digest("base64");

  // signature component
  const componentSignature =
    `Client-Id:${clientId}\n` +
    `Request-Id:${requestId}\n` +
    `Request-Timestamp:${requestTimestamp}\n` +
    `Request-Target:${targetPath}\n` +
    `Digest:${digest}`;

  // signature
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(componentSignature)
    .digest("base64");

  try {
    const response = await axios.post(
      `https://api-sandbox.doku.com${targetPath}`,
      body,
      {
        headers: {
          "Client-Id": clientId,
          "Request-Id": requestId,
          "Request-Timestamp": requestTimestamp,
          "Request-Target": targetPath,
          Signature: `HMACSHA256=${signature}`,
          Digest: digest,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log(
      "DOKU ERROR:",
      err.response?.data || err.message
    );

    throw err;
  }
};

module.exports = { createInvoice };