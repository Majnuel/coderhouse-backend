import express from "express";
const cartRouter = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import {
  getAllCarts,
  createCart,
  deleteCart,
  getCartProducts,
  addProductToCart,
  deleteProductFromCart,
} from "../controllers/carts";

cartRouter.get("/", isAdmin, getAllCarts);
cartRouter.post("/", createCart);
cartRouter.delete("/:id", deleteCart);
cartRouter.get("/:id/products", getCartProducts);
cartRouter.post("/:cartId/products/:productId", addProductToCart);
cartRouter.delete("/:cartId/products/:productId", deleteProductFromCart);

export { cartRouter };
