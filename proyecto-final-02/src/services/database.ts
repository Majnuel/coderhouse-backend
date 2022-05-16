import "dotenv/config";
const mongoose = require("mongoose");

const conectionString =
  process.env.MONGO_ATLAS_CONNECTION_STRING ||
  "mongodb://localhost:27017/clase-19";

// const conectionString = "mongodb://localhost:27017/clase-19";

const initMongoDB = async () => {
  try {
    console.log("conectando a mongo DB Atlas (remote)...");
    await mongoose.connect(conectionString);
    console.log("CONECTADO A MONGO DB ATLAS");
  } catch (err) {
    console.log("there has been an erorr: ", err);
    return err;
  }
};

const disconnectMongoDB = async () => {
  try {
    console.log("desconectando a mongo DB Atlas");
    await mongoose.disconnect();
    console.log("desconectado de mongoDB atlas");
  } catch (err) {
    console.log("there has been an error: ", err);
    return err;
  }
};

export { initMongoDB, disconnectMongoDB };
