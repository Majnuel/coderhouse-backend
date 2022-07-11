import express from "express";
import passport from "passport";
import validateFields from "../middlewares/validateFields";

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
    console.log("Info SIGNUP");
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: "signup OK" });
  })(req, res, next);
});

export { userRouter };
