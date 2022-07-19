import express from "express";
const cartRouter = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import { isLoggedIn } from "../middlewares/auth";
import {
  getAllCarts,
  getCartProducts,
  addProductToCart,
  deleteProductFromCart,
} from "../controllers/carts";

cartRouter.get("/", isAdmin, getAllCarts);
cartRouter.get("/products", isLoggedIn, getCartProducts);
cartRouter.post("/:productId", isLoggedIn, addProductToCart);
cartRouter.delete("/:productId", isLoggedIn, deleteProductFromCart);

export { cartRouter };
