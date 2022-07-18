import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
const app = express.default();
import messageResources from "../controllers/messages";
import myProducts from "../controllers/products";

import { mainRouter } from "../routes/mainRouter";

const server = http.createServer(app);
export const io = new socketio.Server(server);

messageResources.init();
myProducts.init();

const port = process.env.PORT || 8080;

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

io.on("connection", (socket: any) => {
  console.log("socket connection established");
  console.log("SERVER SOCKET ID: ", socket.id);
  console.log("CLIENT SOCKET ID: ", socket.client.id);

  socket.on("ask4Products", () => {
    socket.emit("sendProducts", productArray);
  });

  // nuevo mensaje de chat enviado al servidor
  socket.on("newMessage", (msg: any) => {
    console.log(`client with id ${socket.client.id} sent a message: `, msg);
    const message = {
      author: msg.email,
      message: msg.message,
    };
    //reenvio el mensaje al resto de los clientes
    io.emit("emitNewMessage", message);
    // guardo el mensaje en la DB de mensajes (sqlite3)
    messageResources.addMessage(message);
  });

  //nuevo producto agregado:
  // socket.on("newProduct", (product: any) => {
  //   io.emit("refreshList", productArray);
  // });

  // will send to every client:
  // io.emit("productList", productArray);
});

// middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

app.use("/api", mainRouter);

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.use((req, res) => {
  res.status(404).json({
    msg: "Ruta no encontrada",
  });
});

server.listen(port, () => {
  console.log("SERVER UP AND RUNNING ON PORT: ", port);
});

server.on("error", (err) => {
  console.log("ERROR: ", err);
});
