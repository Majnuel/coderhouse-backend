import express from "express";
import passport from "passport";
import config from "../config";
import { retrieveUserData } from "../helpers/userDataFromReqObj";
import {
  productListForEmail,
  productListForWhatsapp,
} from "../helpers/userProductsList";
import { cartModel } from "../models/carts";
import { logger } from "../services/logger";
import { EmailService } from "../services/mailer";
import { SmsService } from "../services/twilio";
import { createCart } from "./carts";

export const signUpView = (req: express.Request, res: express.Response) => {
  res.render("signup.pug");
};

export const logInView = (req: express.Request, res: express.Response) => {
  res.render("login.pug");
};

export const signUp = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  passport.authenticate("signup", (err, user, info) => {
    logger.info("new sign-up, data: ");
    logger.info(err, user, info);
    if (err) {
      return next(err);
    } else if (!user) {
      return res.status(401).json({ data: info });
    } else {
      createCart(user._id);
      res.redirect("/api/users/login");
    }
  })(req, res, next);
};

export const logIn = (req: express.Request, res: express.Response) => {
  res.redirect("/");
};

export const logOut = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/api/users/login");
  });
};

export const getUserData = async (
  req: express.Request,
  res: express.Response
) => {
  const userID = req.session.passport?.user;
  const cart = await cartModel.find({ owner: `${userID}` });
  res.json({
    msg: "User data",
    userdata: req.user,
    cart: cart[0].products,
  });
};

export const userCheckOut = async (
  req: express.Request,
  res: express.Response
) => {
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
};
