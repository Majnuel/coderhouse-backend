const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let frase = "hola mundo como estan";

app.get("/api/frase", (req, res) => {
  res.status(200).json({ frase: frase });
});

app.get("/api/palabras/:pos", (req, res) => {
  let phraseArray = frase.split(" ");
  let num = parseInt(req.params.pos);
  console.log(phraseArray);
  console.log(num);
  res.status(200).json({ palabra: phraseArray[num - 1] });
});

app.post("/api/palabras", (req, res) => {
  const newWord = req.body.palabra;
  const phraseArray = frase.split(" ");
  phraseArray.push(newWord);
  frase = phraseArray.join(" ");
  res.status(200).json({
    agregada: newWord,
    pos: frase.split(" ").indexOf(newWord),
  });
});

app.put("/api/palabras/:pos", (req, res) => {
  const pos = req.params.pos;
  const newWord = req.body.palabra;
  const phrase = frase.split(" ");
  phrase.splice(pos, 1, newWord);
  frase = phrase.join(" ");
  const palabraAnterior = phrase[phrase.indexOf(newWord) - 1];
  res.status(200).json({
    palabra: newWord,
    anterior: palabraAnterior,
  });
});

app.delete("/api/palabras/:pos", (req, res) => {
  const pos = req.params.pos;
  const phrase = frase.split(" ");
  phrase.splice(pos - 1, 1);
  frase = phrase.join(" ");
  res.sendStatus(202);
});

const server = app.listen(8080, () => {
  console.log("server running on port 8080");
});

server.on("error", (err) => {
  console.log(err);
});
server.on("connection", (stream) => {
  console.log("someone connected!");
});
