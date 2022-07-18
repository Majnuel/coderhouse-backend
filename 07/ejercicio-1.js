const express = require("express");
const app = express();

let frase = "hola mundo como estan";

app.get("/api/frase", (req, res) => {
  res.status(200).json({ frase: frase });
});
const server = app.listen(8080, () => {
  console.log("server running on port 8080");
});

app.get("/api/letras/:num", (req, res) => {
  const { num } = req.params;
  if (typeof num !== "number") {
    res.status(400).json({ error: "param is not a number" });
  } else if (num < 1 || num > frase.split("").length) {
    res.status(401).json({ error: "out of range" });
  } else res.status(200).json({ letra: frase[num - 1] });
});

app.get("/api/palabras/:num", (req, res) => {
  const { num } = req.params;
  const arrayPhrase = frase.split(" ");
  if (num < 1 || num > arrayPhrase.length) {
    res.status(400).json({ error: "out of range" });
  } else res.status(200).json({ palabra: arrayPhrase[num - 1] });
});

server.on("error", (err) => console.log("ERROR: ", err));

// console.log(frase.split("").length);
