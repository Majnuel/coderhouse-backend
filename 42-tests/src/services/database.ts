const mongoose = require("mongoose");
import config from "../config";
import { logger } from "./logger";

const initMongoDB = async () => {
  try {
    logger.info("conectando a mongo DB Atlas (remote)...");
    await mongoose.connect(config.MONGO_ATLAS_CONNECTION_STRING);
    logger.info("CONECTADO A MONGO DB ATLAS");
    console.log("CURRENT MONGO SRV: ", config.MONGO_ATLAS_CONNECTION_STRING);
  } catch (err) {
    logger.error("there has been an erorr: ", err);
    return err;
  }
};

const disconnectMongoDB = async () => {
  try {
    logger.info("desconectando a mongo DB Atlas");
    await mongoose.disconnect();
    logger.info("desconectado de mongoDB atlas");
  } catch (err) {
    logger.error("there has been an error: ", err);
    return err;
  }
};

export { initMongoDB, disconnectMongoDB };
