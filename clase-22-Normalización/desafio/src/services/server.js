const express = require("express");
import * as util from "util";
import { normalize, schema } from "normalizr";
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const io = require("socket.io");
const { faker } = require("@faker-js/faker");
const app = express();
import { initMongoDB } from "../services/db";
import { messageModel } from "../models/messages";

let port = 8080;

const myServer = http.Server(app);
const myWSServer = io(myServer);

const productArray = [];
for (let i = 0; i < 5; i++) {
  const newProduct = {
    name: faker.commerce.productName(),
    price: faker.finance.amount(),
    thumbnail: faker.internet.avatar(),
  };
  productArray.push(newProduct);
}

// ******************** NORMALIZR:
const author = new schema.Entity("author", {}, { idAttribute: "email" });
const msge = new schema.Entity(
  "message",
  {
    author: author,
  },
  { idAttribute: "_id" }
);
const msgesSchema = new schema.Array(msge);
// *****************************

const getAllMessages = async () => {
  try {
    //El lean le dice a mongoose que solo queremos un simple objeto como respuesta
    const messagesOriginalData = await messageModel.find().lean();

    let normalizedMessages = normalize(messagesOriginalData, msgesSchema);

    console.log(util.inspect(normalizedMessages, true, 3, true));
    return normalizedMessages;
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

myWSServer.on("connection", (socket) => {
  console.log("socket connection established:");
  console.log("SERVER SOCKET ID: ", socket.id);
  console.log("CLIENT SOCKET ID: ", socket.client.id);

  socket.on("ask4Products", () => {
    socket.emit("sendProducts", productArray);
    console.log("ask4Products triggered");
  });

  socket.on("ask4ChatHistory", async () => {
    const messages = await getAllMessages();
    // console.log(messages);
    socket.emit("sendChatHistoryToClient", messages);
  });

  // when a new message is sent from client:
  socket.on("newMessage", async (msg) => {
    console.log(`client with id ${socket.client.id} sent a message: `, msg);
    await messageModel.create(msg);

    // will send a message to all clients except to who send the newMessage
    // socket.broadcast.emit("messageFromServer", {message})
  });

  // will create a new product, add an ID, push to array and emit to connected clients
  socket.on("newProduct", (product) => {
    newProduct = {
      id: uuidv4(),
      ...product,
    };
    productArray.push(newProduct);
    myWSServer.emit("refreshList", productArray);
  });

  // will send to every client:
  myWSServer.emit("productList", productArray);
});

app.get("/", (req, res) => {
  res.render("index.pug", { products: productArray });
});

app.get("/api/productos-test", (req, res) => {
  res.status(200).json(productArray);
});

// conexion a MongoDB
const DB = async () => {
  await initMongoDB();
};
DB();

const server = myServer.listen(port, () => {
  console.log("SERVER RUNNING ON PORT: ", port);
});

server.on("error", (err) => {
  console.log("ERROR!!: ", err);
});
