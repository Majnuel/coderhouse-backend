import express from "express";
const app = express();
import { mainRouter } from "./routes/mainRouter";

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

server.on("error", (err) => {
  console.log("ERROR: ", err);
});
