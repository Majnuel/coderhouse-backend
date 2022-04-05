const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

class Producto {
  title;
  price;
  thumbnail;
  id;
  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.productos = [
      { title: title, price: price, thumbnail: thumbnail, id: uuidv4() },
    ];
  }

  addProduct(title, price, thumbnail) {
    const newProduct = {
      title: title,
      price: price,
      thumbnail: thumbnail,
      id: uuidv4(),
    };
    this.productos.push(newProduct);
    return newProduct;
  }

  getAll() {
    return this.productos;
  }

  updateProduct(title, price, thumbnail, id) {
    let index = this.productos.findIndex((product) => product.id === id);
    this.productos[index] = {
      title: title,
      pric: price,
      thumbnail: thumbnail,
      id: id,
    };
  }

  deleteProduct(id) {
    const productToDelete = this.productos.filter(
      (products) => products.id === id
    );
    if (productToDelete == []) {
      return false;
    } else if (productToDelete !== []) {
      this.productos = this.productos.filter((products) => products.id !== id);
      return true;
    }
  }
}

const misProductos = new Producto("cuaderno", 45, "https://place-hold.it/300");
misProductos.addProduct("lapicera", 7, "https://place-hold.it/300");

router.get("/", (req, res) => {
  const allProducts = misProductos.getAll();
  res.status(200).json(allProducts);
});

router.get("/:id", (req, res) => {
  const allProducts = misProductos.getAll();
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
    const newProduct = misProductos.addProduct(title, price, thumbnail);
    return res.status(201).json(newProduct);
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, price, thumbnail } = req.body;
  if (!id || !title || !price || !thumbnail) {
    return res.status(400).json({ msg: "bad request" });
  } else {
    misProductos.updateProduct(title, price, thumbnail, id);
    return res.status(201).json({ msg: "modified" });
  }
});

router.delete("/:id", (req, res) => {
  // console.log(misProductos.deleteProduct(req.params.id));
  if (misProductos.deleteProduct(req.params.id)) {
    return res.status(202).json({ msg: `${req.params.id} deleted` });
  } else res.status(400).json({ msg: "bad request" });
});

module.exports = router;
