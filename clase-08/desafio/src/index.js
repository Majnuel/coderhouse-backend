const express = require("express");
const app = express();
const mainRouter = require("./routes/mainRouter");
const path = require("path");

const publicDirPath = path.resolve(__dirname, "../static");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let port = 8080;
server = app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT: ", port);
});

server.on("error", (err) => {
  console.log("THERE HAS BEEN AN ERROR: ", err);
});

app.use("/api", mainRouter);

app.use(express.static(publicDirPath));
