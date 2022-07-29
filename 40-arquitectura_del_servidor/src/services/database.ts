import mongoose from "mongoose";
import config from "../config";
import { logger } from "./logger";

export class MongoDBClient {
  private static client: MongoDBClient;

  private constructor() {}

  isValidId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  static async getConnection() {
    if (!MongoDBClient.client) {
      logger.info;
      const srv = config.MONGO_ATLAS_CONNECTION_STRING;
      await mongoose.connect(srv, {});
      MongoDBClient.client = new MongoDBClient();
    }
    return MongoDBClient.client;
  }
}

const initMongoDB = async () => {
  try {
    logger.info("conectando a mongo DB Atlas (remote)...");
    await mongoose.connect(config.MONGO_ATLAS_CONNECTION_STRING);
    logger.info("CONECTADO A MONGO DB ATLAS");
  } catch (err) {
    logger.error("there has been an erorr: ", err);
    return err;
  }
};

export { initMongoDB };
