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

    res.redirect("/api/users/login");
  })(req, res, next);
});

userRouter.post("/login", passport.authenticate("login"), function (req, res) {
  console.log("user: ", req.user);
  res.redirect("/");
});

userRouter.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/api/users/login");
  });
});

export { userRouter };
