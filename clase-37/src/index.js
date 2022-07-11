console.log("HENLO");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ msg: "henlo with yarn" });
});

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
