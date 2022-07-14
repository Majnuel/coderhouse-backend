import express from "express";
import passport from "passport";
import {
  logInView,
  signUp,
  signUpView,
  logIn,
  logOut,
  getUserData,
  userCheckOut,
} from "../controllers/users";
import { isLoggedIn } from "../middlewares/auth";
import validateFields from "../middlewares/validateFields";

const userRouter = express.Router();

userRouter.get("/signup", signUpView);
userRouter.get("/login", logInView);
userRouter.post("/signup", validateFields, signUp);
userRouter.post("/login", passport.authenticate("login"), logIn);
userRouter.post("/logout", logOut);
userRouter.get("/user-data", isLoggedIn, getUserData);
userRouter.get("/checkout", isLoggedIn, userCheckOut);

export { userRouter };
