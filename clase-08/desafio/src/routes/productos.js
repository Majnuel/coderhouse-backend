const express = require("express");
const router = express.Router();
const instanciaProductos = require("../classes/producto");

instanciaProductos.addProduct("lapicera", 7, "https://place-hold.it/300");

console.log(instanciaProductos.getAll());

router.get("/", (req, res) => {
  const allProducts = instanciaProductos.getAll();
  res.status(200).json(allProducts);
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  const allProducts = instanciaProductos.getAll();
  const product = allProducts.filter((element) => element.id === req.params.id);
  if (!product.length) {
    return res.status(404).json({ msg: "product not found" });
  } else return res.json(product);
});

router.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;
  if (!title || !price || !thumbnail) {
    res.status(400).json({ msg: "bad request" });
  } else {
    const newProduct = instanciaProductos.addProduct(title, price, thumbnail);
    return res.status(201).json(newProduct);
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, price, thumbnail } = req.body;
  if (!id || !title || !price || !thumbnail) {
    return res.status(400).json({ msg: "bad request" });
  } else {
    instanciaProductos.updateProduct(title, price, thumbnail, id);
    return res.status(201).json({ msg: "modified" });
  }
});

router.delete("/:id", (req, res) => {
  // console.log(instanciaProductos.deleteProduct(req.params.id));
  if (instanciaProductos.deleteProduct(req.params.id)) {
    return res.status(202).json({ msg: `${req.params.id} deleted` });
  } else res.status(400).json({ msg: "bad request" });
});

module.exports = router;
