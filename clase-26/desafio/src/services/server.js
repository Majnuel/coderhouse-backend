const express = require("express");
const app = express();
import * as util from "util";
import { normalize, schema } from "normalizr";
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const io = require("socket.io");
import { initMongoDB } from "../services/db";
import { messageModel } from "../models/messages";
import config from "../config";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "../routes/index";
import { productArray } from "../utils/productArray";

const ttlInSeconds = 60;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_STR,
    crypto: {
      secret: "squirrel",
    },
  }),
  secret: "geheimnis",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlInSeconds * 1000,
  },
};

const myServer = http.Server(app);
const myWSServer = io(myServer);

// NORMALIZR: ********************
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
    //El "lean" le dice a mongoose que solo queremos un simple objeto como respuesta
    const messagesOriginalData = await messageModel.find().lean();

    let normalizedMessages = normalize(messagesOriginalData, msgesSchema);

    // console.log(util.inspect(normalizedMessages, true, 3, true));
    return normalizedMessages;
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
};

// *****************  MIDDLEWARES: ********************
// public folder and template engine:
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");

// json and body payloads:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and session:
app.use(cookieParser());
app.use(session(StoreOptions));

app.use("/", router);

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

// conexion a MongoDB
const DB = async () => {
  await initMongoDB();
};
DB();

const server = myServer.listen(config.PORT, () => {
  console.log("SERVER RUNNING ON PORT: ", config.PORT);
});

server.on("error", (err) => {
  console.log("ERROR!!: ", err);
});
