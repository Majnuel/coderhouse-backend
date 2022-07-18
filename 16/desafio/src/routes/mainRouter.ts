import express from "express";
const mainRouter = express.Router();
import { productsRouter } from "./productsRouter";
import { cartRouter } from "./cartRouter";

mainRouter.get("/", (req, res) => {
  res.json({ msg: "main API page" });
});

mainRouter.use("/products", productsRouter);
mainRouter.use("/carts", cartRouter);

export { mainRouter };
