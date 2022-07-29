import express from "express";
const productsRouter = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import {
  ProductController,
} from "../controllers/products";
import { checkBodyProduct } from "../middlewares/checkBodyProduct";
import expressAsyncHandler from "express-async-handler";

productsRouter.get("/", expressAsyncHandler(ProductController.getProducts);
productsRouter.post("/", checkBodyProduct, expressAsyncHandler(createProduct));
productsRouter.get("/:id", expressAsyncHandler(getProductByID));
productsRouter.delete("/:id", isAdmin, expressAsyncHandler(deleteByID));
productsRouter.put(
  "/:id",
  isAdmin,
  checkBodyProduct,
  expressAsyncHandler(updateProduct)
);

export { productsRouter };
