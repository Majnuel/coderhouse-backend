import { Router } from "express";
import validateLogIn from "../middlewares/validateLogIn";
import users from "../utils/users";
import productArray from "../utils/productArray";

const router = Router();

router.get("/", validateLogIn, (req, res) => {
  res.render("index.pug", {
    products: productArray,
    username: req.session.info.username,
  });
});

router.get("/login", (req, res) => {
  res.render("login.pug");
});

router.get("/signup", (req, res) => {
  res.render("signup.pug");
});

router.get("/api/productos-test", (req, res) => {
  res.status(200).json(productArray);
});

router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  const index = users.findIndex((user) => user.username === userName);
  if (index === -1) {
    res.status(401).json({ msg: "usuario no se encuentra autorizado" });
  } else {
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      username: user.username,
      admin: user.admin,
    };
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  console.log("logout endpoint reached");
  req.session.destroy((err) => {
    if (!err) res.json("Logout ok!");
    else res.send({ status: "Logout ERROR", body: err });
  });
});

export default router;
