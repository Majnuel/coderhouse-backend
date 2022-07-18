const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Enviar una cookie
app.post("/cookies", (req, res) => {
  const { key, value, TTL } = req.body;
  console.log("cookie set in client: ", req.body);
  res.cookie(key, value, { maxAge: TTL }).json({ msg: "cookie set" });
});

//Lectura de cookies
app.get("/cookies", (req, res) => {
  console.log(req.cookies);
  res.send({
    cookies: req.cookies,
  });
});

//Eliminar una cookie:
app.delete("/clear-cookie", (req, res) => {
  const { cookieToDelete } = req.body;
  res.clearCookie(cookieToDelete).json({ msg: "cookie cleared" });
});

app.listen(8080, () => {
  console.log("server up and running on port 8080");
});
