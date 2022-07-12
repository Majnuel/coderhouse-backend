import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_ATLAS_CONNECTION_STRING:
    process.env.MONGO_ATLAS_CONNECTION_STRING || "mongoSRV",
  PORT: process.env.PORT || 8080,
  CRYPTO: process.env.CRYPTO_SECRET || "Crypto secret word",
  MONGO_STORE_SECRET: process.env.MONGO_STORE_SECRET || "mongo store secret",
  GMAIL_APP_PASSWORD: "ptolvmqqlphgwgur",
  GMAIL_EMAIL: "ecalle87@gmail.com",
};
