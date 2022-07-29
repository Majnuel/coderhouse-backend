import express from "express";
const mainRouter = express.Router();
import { productsRouter } from "./productsRouter";
import { cartRouter } from "./cartRouter";
import { userRouter } from "./userRouter";
import { isLoggedIn } from "../middlewares/auth";

mainRouter.get("/", isLoggedIn, (req, res) => {
  res.status(200).json({
    msg: "main API endpoint",
  });
});

mainRouter.use("/products", productsRouter);
mainRouter.use("/carts", cartRouter);
mainRouter.use("/users", userRouter);

export { mainRouter };
