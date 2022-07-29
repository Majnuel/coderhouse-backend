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
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.get("/signup", signUpView);
userRouter.get("/login", logInView);
userRouter.post("/signup", validateFields, expressAsyncHandler(signUp));
userRouter.post(
  "/login",
  passport.authenticate("login"),
  expressAsyncHandler(logIn)
);
userRouter.post("/logout", expressAsyncHandler(logOut));
userRouter.get("/user-data", isLoggedIn, expressAsyncHandler(getUserData));
userRouter.get("/checkout", isLoggedIn, expressAsyncHandler(userCheckOut));

export { userRouter };
