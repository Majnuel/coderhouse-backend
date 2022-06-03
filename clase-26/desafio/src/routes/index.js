import passport from "passport";
import { Router } from "express";
import productArray from "../utils/productArray";
import { isLoggedIn } from "../middlewares/auth";
import UserRouter from "./user";
import validateFields from "../middlewares/validateFields";
import util from "util";

console.log(util.inspect(validateFields, true, 7, true));

const router = Router();

router.use("/user", isLoggedIn, UserRouter);

const passportOptions = { badRequestMessage: "Falta username / password" };

router.post(
  "/login",
  passport.authenticate("login", passportOptions),
  function (req, res) {
    console.log("user: ", req.user);
    // res.json({ msg: "Welcome!", user: req.user });
    res.redirect("/");
  }
);

router.post("/signup", validateFields, (req, res, next) => {
  passport.authenticate("signup", passportOptions, (err, user, info) => {
    console.log("Info SIGNUP");
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: "signup OK" });
  })(req, res, next);
});

router.get("/", isLoggedIn, (req, res) => {
  res.render("index.pug", {
    products: productArray,
    username: req.user.username,
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

router.post("/logout", (req, res, next) => {
  console.log("logout endpoint reached");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

router.get("/missing-fields", (req, res) => {
  res.render("user-exists");
});

export default router;
