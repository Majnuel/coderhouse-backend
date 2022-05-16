const mongoose = require("mongoose");

const conectionString = "mongodb://localhost:27017/clase-19";

const initMongoDB = async () => {
  try {
    console.log("conectando a mongo DB local...");
    await mongoose.connect(conectionString);
    console.log("CONECTADO A MONGO DB LOCAL!");
  } catch (err) {
    console.log("there has been an erorr: ", err);
    return error;
  }
};

const disconnectMongoDB = async () => {
  try {
    console.log("desconectando a mongo DB local...");
    await mongoose.disconnect();
    console.log("desconectado de mongoDB");
  } catch (err) {
    console.log("there has been an erorr: ", err);
    return error;
  }
};

module.exports = { initMongoDB, disconnectMongoDB };
