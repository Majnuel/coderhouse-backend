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
import expressAsyncHandler from "express-async-handler";

cartRouter.get("/", isAdmin, expressAsyncHandler(getAllCarts));
cartRouter.get("/products", isLoggedIn, expressAsyncHandler(getCartProducts));
cartRouter.post(
  "/:productId",
  isLoggedIn,
  expressAsyncHandler(addProductToCart)
);
cartRouter.delete(
  "/:productId",
  isLoggedIn,
  expressAsyncHandler(deleteProductFromCart)
);

export { cartRouter };
