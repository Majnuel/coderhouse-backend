const express = require("express");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const io = require("socket.io");
const app = express();

let port = 8080;

const myServer = http.Server(app);
const myWSServer = io(myServer);

const productArray = [
  {
    id: "6ff607f8-0b23-460c-9a03-fe01d3cc5e1e",
    name: "Jetpack",
    price: 40,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/atomic-nuclear-age/252/atomic-nuclear-age-11-512.png",
  },
  {
    id: "9abb8b54-0a1c-4070-951b-95231dd98d43",
    name: "C4",
    price: 23,
    thumbnail:
      "https://cdn2.iconfinder.com/data/icons/atomic-nuclear-age/252/atomic-nuclear-age-11-512.png",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

myWSServer.on("connection", (socket) => {
  console.log("socket connection established");
  console.log("SERVER SOCKET ID: ", socket.id);
  console.log("CLIENT SOCKET ID: ", socket.client.id);

  socket.on("ask4Products", () => {
    socket.emit("sendProducts", productArray);
  });

  socket.on("newMessage", (msg) => {
    console.log(`client with id ${socket.client.id} envió un mensaje: `, msg);
    const message = {
      author: msg.email,
      msg: msg.msg,
      time: new Date(),
    };
    myWSServer.emit("emitNewMessage", message);
    const history = async () => {
      const data = fs.readFile("src/chatHistory.json", "utf-8");
      return data;
    };
    history().then(async (data) => {
      const parsedData = JSON.parse(data);
      parsedData.push(message);
      fs.writeFile("src/chatHistory.json", JSON.stringify(parsedData));
    });

    // will send a message to all clients except to who send the newMessage
    // socket.broadcast.emit("messageFromServer", {message})
  });

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

const server = myServer.listen(port, () => {
  console.log("SERVER RUNNING ON PORT: ", port);
});

server.on("error", (err) => {
  console.log("ERROR!!: ", err);
});
