import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_ATLAS_CONNECTION_STRING:
    process.env.MONGO_ATLAS_CONNECTION_STRING || "mongoSRV",
  PORT: process.env.PORT || 8080,
};
