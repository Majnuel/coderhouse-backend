import express from "express";
const app = express();
import { mainRouter } from "../routes/mainRouter";
import { initMongoDB } from "./database";
import config from "../config";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { signUpFunc, loginFunc } from "./auth";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder and template engine:
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");

const ttlInSeconds = 10;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_CONNECTION_STRING,
    crypto: {
      secret: "squirrel",
    },
  }),
  secret: "geheimnis",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlInSeconds * 1000,
  },
};
app.use(cookieParser());
app.use(session(StoreOptions));

//Indicamos que vamos a usar passport en todas nuestras rutas
app.use(passport.initialize());

//Permitimos que passport pueda manipular las sessiones de nuestra app
app.use(passport.session());

// loginFunc va a ser una funcion que vamos a crear y va a tener la logica de autenticacion
// Cuando un usuario se autentique correctamente, passport va a devolver en la session la info del usuario
// passport.use("login", loginFunc);

//signUpFunc va a ser una funcion que vamos a crear y va a tener la logica de registro de nuevos usuarios
passport.use("signup", signUpFunc);

app.use("/api", mainRouter);

app.use((req, res) => {
  res.status(404).json({
    msg: "Ruta no encontrada",
  });
});

const server = app.listen(config.PORT, () => {
  DB();
  console.log("SERVER UP AND RUNNING ON PORT: ", config.PORT);
});

const DB = async () => {
  await initMongoDB();
};

server.on("error", (err) => {
  console.log("ERROR: ", err);
});
