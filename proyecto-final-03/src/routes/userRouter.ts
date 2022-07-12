import express from "express";
import passport from "passport";
import { createCart } from "../controllers/carts";
import { isLoggedIn } from "../middlewares/auth";
import validateFields from "../middlewares/validateFields";
import { cartModel } from "../models/carts";

const userRouter = express.Router();

const passportOptions = { badRequestMessage: "Falta username / password" };

userRouter.get("/signup", (req, res) => {
  res.render("signup.pug");
});

userRouter.get("/login", (req, res) => {
  res.render("login.pug");
});

userRouter.post("/signup", validateFields, (req, res, next) => {
  passport.authenticate("signup", (err, user, info) => {
    console.log("Info SIGNUP in userRouter.ts : ");
    console.log(err, user, info);
    if (err) {
      return next(err);
    } else if (!user) {
      return res.status(401).json({ data: info });
    } else {
      createCart(user._id);
      res.redirect("/api/users/login");
    }
  })(req, res, next);
});

userRouter.post("/login", passport.authenticate("login"), function (req, res) {
  console.log("user: ", req.user);
  res.redirect("/");
});

userRouter.post("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/api/users/login");
  });
});

userRouter.get("/user-data", isLoggedIn, async (req, res) => {
  const userID = req.session.passport?.user;
  const cart = await cartModel.find({ owner: `${userID}` });
  res.json({
    msg: "User data",
    userdata: req.user,
    cart: cart[0].products,
  });
});

export { userRouter };
