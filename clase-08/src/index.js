const express = require("express");
const app = express();
const mainRouter = require("./routes/index");

const port = 8080;
const server = app.listen(port, () => {
  console.log("Server running on port: ", port);
});

server.on("error", (err) => {
  console.log("ERROR: ", err);
});

app.use("/api", mainRouter);
