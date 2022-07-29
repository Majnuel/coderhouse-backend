import express from "express";
const productsRouter = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import {
  getAllProducts,
  createProduct,
  getProductByID,
  deleteByID,
  updateProduct,
} from "../controllers/products";
import { checkBodyProduct } from "../middlewares/checkBodyProduct";
import expressAsyncHandler from "express-async-handler";

productsRouter.get("/", expressAsyncHandler(getAllProducts));
productsRouter.post("/", checkBodyProduct, expressAsyncHandler(createProduct));
productsRouter.get("/:id", expressAsyncHandler(getProductByID));
productsRouter.delete("/:id", expressAsyncHandler(deleteByID));
productsRouter.put(
  "/:id",
  checkBodyProduct,
  expressAsyncHandler(updateProduct)
);

export { productsRouter };
