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

productsRouter.get("/", getAllProducts);
productsRouter.post("/", checkBodyProduct, createProduct);
productsRouter.get("/:id", getProductByID);
productsRouter.delete("/:id", isAdmin, deleteByID);
productsRouter.put("/:id", isAdmin, checkBodyProduct, updateProduct);

export { productsRouter };
