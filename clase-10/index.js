const { urlencoded } = require("express");
const express = require("express");
const app = express();
let port = 8080;

let productArray = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "pug");

// ejercicio de clase:
app.post("/datos", (req, res) => {
  res.render("ejercicio1.pug", {
    min: req.query.min,
    nivel: req.query.nivel,
    max: req.query.max,
    titulo: req.query.titulo,
  });
});

app.get("/productos", (req, res) => {
  res.render("index.pug");
});
app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newProduct = {
    title: title,
    price: price,
    thumbnail: thumbnail,
  };
  productArray.push(newProduct);
  res.render("index.pug", { products: productArray });
});

const server = app.listen(port, (req, res) => {
  console.log("SERVER RUNNING ON PORT: ", port);
});

server.on("error", (err) => {
  console.log("ERROR!!: ", er);
});
