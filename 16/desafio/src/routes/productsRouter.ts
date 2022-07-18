import express from "express";
const productsRouter = express.Router();
import myProducts from "../controllers/products";
import { isAdmin } from "../middlewares/isAdmin";

productsRouter.get("/:id?", async (req, res) => {
  //si no hay nada en params responde con la lista de todos los productos
  if (!req.params.id) {
    const products = await myProducts.getAllProducts();
    res.status(200).send(products);
  } else if (req.params.id) {
    const product = await myProducts.getProductById(parseInt(req.params.id));
    if (product.length) {
      res.status(200).json({ product: product });
    } else {
      res.status(404).json({ msg: "product not found" });
    }
  }
});

// ingresar un nuevo producto
productsRouter.post("/", isAdmin, async (req, res) => {
  const newProduct = req.body;
  await myProducts.addProduct(newProduct);
  res.sendStatus(201);
});

//update a product:
productsRouter.put("/:id", isAdmin, async (req, res) => {
  const { name, description, stock, price, thumbnail } = req.body;
  if (
    !name ||
    !description ||
    !stock ||
    !price ||
    (!thumbnail && !req.params.id)
  ) {
    res.status(400).json({
      msg: "bad request: missing paramenters. Make sure you send all: name, description, stock, price, thumbnail",
    });
  } else {
    const update = await myProducts
      .updateProduct(req.params.id, name, description, stock, price, thumbnail)
      .then((outcome) => {
        if (outcome) {
          res.status(200).json({ msg: "product modified" });
        } else {
          res.status(404).json({ msg: "product not found" });
        }
      });
  }
});

productsRouter.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deletion = await myProducts.deleteProduct(req.params.id);
    if (deletion) {
      res.status(204).json({ msg: "product successfully deleted" });
    } else {
      res.status(404).json({ msg: "product not found" });
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
});

export { productsRouter };
