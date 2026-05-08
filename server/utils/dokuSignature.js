const crypto = require("crypto");

function generateSignature({ clientId, requestId, timestamp, requestBody, secretKey }) {
  const bodyString = JSON.stringify(requestBody);

  const stringToSign =
    clientId + requestId + timestamp + bodyString;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(stringToSign)
    .digest("base64");

  return signature;
}

module.exports = {
  generateSignature,
};