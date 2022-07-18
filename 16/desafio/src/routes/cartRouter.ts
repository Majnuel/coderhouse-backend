import express from "express";
const cartRouter = express.Router();
import Carts from "../controllers/cart";

cartRouter.get("/", (req, res) => {
  res.json({ msg: "cart main endpoint" });
});

// crea un carrito:
cartRouter.post("/", async (req, res) => {
  const newCart = await Carts.createCart();
  res.status(200).json(newCart);
});

// elimina un carrito con id:
cartRouter.delete("/:id", (req, res) => {
  Carts.deleteCart(req.params.id).then((resolution) => {
    if (resolution) {
      res.status(200).json({ msg: "cart deleted" });
    } else {
      res.status(400).json({ msg: `cart with id[${req.params.id}] not found` });
    }
  });
});

// agrega un producto a un carrito:
cartRouter.post("/:cartId/productos/:productId", (req, res) => {
  Carts.addProduct(req.params.cartId, req.params.productId).then((outcome) => {
    if (outcome?.output) {
      res.status(200).json({ msg: outcome.msg });
    } else if (!outcome?.output) {
      res.status(400).json({ msg: outcome?.msg });
    }
  });
});

// listar productos en un carrito:
cartRouter.get("/:id/productos", async (req, res) => {
  const cartData = await Carts.getCart(req.params.id);
  if (cartData)
    res.status(200).json({ cartId: cartData.id, products: cartData.products });
  else res.status(400).json({ msg: "bad request: cart not found" });
});

//borrar productos de un carrito
cartRouter.delete("/:cartId/productos/:productId", (req, res) => {
  if (!req.params.cartId || !req.params.productId) {
    res.status(400).json({ msg: "bad request: no cartId/productId" });
  }
  Carts.removeProductfromCart(req.params.cartId, req.params.productId).then(
    (outcome) => {
      if (outcome.output) res.status(200).json({ msg: outcome.msg });
      else res.status(400).json({ msg: outcome.msg });
    }
  );
});

export { cartRouter };
