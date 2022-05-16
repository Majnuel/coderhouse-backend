import express from "express";
const app = express();
import { mainRouter } from "../routes/mainRouter";
import { initMongoDB, disconnectMongoDB } from "./database";

const port = process.env.PORT || 8080;

// middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.use((req, res) => {
  res.status(404).json({
    msg: "Ruta no encontrada",
  });
});

const server = app.listen(port, () => {
  console.log("SERVER UP AND RUNNING ON PORT: ", port);
});

const DB = async () => {
  await initMongoDB();
};

DB();

server.on("error", (err) => {
  console.log("ERROR: ", err);
});
