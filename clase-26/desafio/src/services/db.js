// import "dotenv/config";
const mongoose = require("mongoose");
import config from "../config";

const initMongoDB = async () => {
  try {
    console.log("Conectando a MongoDB...");
    await mongoose.connect(
      `mongodb+srv://${config.MONGO_USR}:${config.MONGO_PWD}@cluster0.ydcxa.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("CONECTADO EXITOSAMENTE A MONGO!");
  } catch (err) {
    console.log("there has been an erorr: ", err);
    return err;
  }
};

const disconnectMongoDB = async () => {
  try {
    console.log("desconectando a mongo");
    await mongoose.disconnect();
    console.log("DESCONECTADO EXITOSAMENTE DE MONGO");
  } catch (err) {
    console.log("there has been an error: ", err);
    return err;
  }
};

export { initMongoDB, disconnectMongoDB };
