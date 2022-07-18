const express = require("express");
const router = express.Router();
const routerProductos = require("./productos");

router.use("/productos", routerProductos);

router.get("/", (req, res) => {
  res.json({ msg: "pagina principal de la API" });
});

module.exports = router;
