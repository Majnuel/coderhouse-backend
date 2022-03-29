const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(8080, () => {
  console.log("server running on port 8080");
});

app.get("/api/sumar/:num1/:num2", (req, res) => {
  if (req.params.num1 && req.params.num2) {
    const { num1, num2 } = req.params;
    const result = parseInt(num1) + parseInt(num2);
    return res.status(200).json({ result: result });
  }
});

app.get("/api/sumar", (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseInt(num1) + parseInt(num2);
  return res.status(200).json({ result: result });
});

server.on("error", (err) => console.log("error: ", err));
