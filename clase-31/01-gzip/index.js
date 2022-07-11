const express = require("express");
const compression = require("compression");

const saludo = () => {
  const arraySaludo = [];
  for (let i = 0; i <= 1000; i++) {
    arraySaludo.push("Hola que tal");
  }
  return arraySaludo;
};

const app = express();

app.get("/saludo", (req, res) => {
  res.status(200).json({ payload: saludo() });
});

app.get("/saludoComprimido", compression(), (req, res) => {
  res.status(200).json({ payload: saludo() });
});

app.listen(8080, (req, res) => {
  console.log("server up and running on port 8080");
});
