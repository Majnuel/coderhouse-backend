const cluster = require("cluster");
const os = require("os");
const express = require("express");

const app = express();

app.listen(8080, () => {
  console.log("SERVER LISTENING ON PORT 8080. " + "PROCESS ID: " + process.pid);
});

const numCPUs = os.cpus().length;

console.log(numCPUs);
