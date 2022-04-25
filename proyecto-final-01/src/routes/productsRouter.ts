import express from "express";
const productsRouter = express.Router();
import myProducts from "../controllers/products";
import { isAdmin } from "../middlewares/isAdmin";

productsRouter.get("/:id?", async (req, res) => {
  //si no hay nada en params responde con la lista de todos los productos
  if (!req.params.id) {
    const products = await myProducts.getData();
    res.status(200).send(products);
  } else if (req.params.id) {
    const product = await myProducts.getProduct(req.params.id);
    if (product) {
      res.status(200).json({ product: product });
    } else {
      res.status(404).json({ msg: "product not found" });
    }
  }
});

productsRouter.post("/", isAdmin, async (req, res) => {
  const newProduct = req.body;
  await myProducts.addProduct(newProduct);
  res.sendStatus(201);
});

productsRouter.put("/:id", isAdmin, async (req, res) => {
  const { name, description, stock, price, thumbnailURL } = req.body;
  if (
    !name ||
    !description ||
    !stock ||
    !price ||
    !thumbnailURL ||
    !req.params.id
  ) {
    res.status(400).json({ msg: "bad request: missing paramenters: " });
  } else {
    await myProducts
      .updateProduct(
        req.params.id,
        name,
        description,
        stock,
        price,
        thumbnailURL
      )
      .then((outcome) => {
        if (outcome) {
          res.status(200).json({ msg: "product modified" });
        } else {
          res.status(404).json({ msg: "product not found" });
        }
      });
  }
});

productsRouter.delete("/:id", isAdmin, (req, res) => {
  console.log(req.params);
  myProducts.deleteProduct(req.params.id).then((outcome) => {
    if (outcome) {
      res.status(200).json({ msg: "product deleted" });
    } else {
      res.status(404).json({ msg: "product not found" });
    }
  });
});

export { productsRouter };
