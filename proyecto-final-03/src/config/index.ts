import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_ATLAS_CONNECTION_STRING:
    process.env.MONGO_ATLAS_CONNECTION_STRING || "mongoSRV",
  PORT: process.env.PORT || 8080,
  CRYPTO: process.env.CRYPTO_SECRET || "Crypto secret word",
  MONGO_STORE_SECRET: process.env.MONGO_STORE_SECRET || "mongo store secret",
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD || "gmail app password",
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || "gmail email to send emails from",
  TWILIO_WHATSAPP_NUMBER:
    process.env.TWILIO_WHATSAPP_NUMBER || "some other phone",
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "account SID",
  TWILIO_TOKEN: process.env.TWILIO_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  ADMIN_PHONE_NUMBER: process.env.ADMIN_PHONE_NUMBER || "admin phone number",
};
