import express from "express";
import passport from "passport";
import config from "../config";
import { createCart } from "../controllers/carts";
import { retrieveUserData } from "../helpers/userDataFromReqObj";
import {
  productListForEmail,
  productListForWhatsapp,
} from "../helpers/userProductsList";
import { isLoggedIn } from "../middlewares/auth";
import validateFields from "../middlewares/validateFields";
import { cartModel } from "../models/carts";
import { EmailService } from "../services/mailer";
import { SmsService } from "../services/twilio";

const userRouter = express.Router();

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

userRouter.get("/checkout", isLoggedIn, async (req, res) => {
  const userID = req.session.passport?.user;
  const cart = await cartModel.find({ owner: `${userID}` });
  EmailService.sendEmail(
    config.GMAIL_EMAIL,
    `Nuevo pedido de ${retrieveUserData(req).name}`,
    `<h1>Nuevo pedido de ${
      retrieveUserData(req).name
    }:</h1><h4>Productos:</h4><ul>${productListForEmail(cart[0].products)}</ul>`
  );
  SmsService.sendMessage(
    retrieveUserData(req).phone,
    "Su pedido ha sido recibido y se encuentra en proceso"
  );
  SmsService.sendWhatsAppMessage(
    config.ADMIN_PHONE_NUMBER,
    `Nuevo pedido de ${retrieveUserData(req).name}:\n\n${productListForWhatsapp(
      cart[0].products
    )}`
  );
  res.json({
    msg: `user ${userID}, wants to check out`,
    cart: cart[0].products,
  });
});

export { userRouter };
