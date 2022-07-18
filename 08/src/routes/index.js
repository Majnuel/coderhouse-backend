const express = require("express");
const router = express.Router();
const mascotasRouter = require("./mascotas");
const personasRouter = require("./personas");

router.use("/personas", personasRouter);
router.use("/mascotas", mascotasRouter);

router.get("/", (req, res) => {
  res.json({ msg: "main api page" });
});

module.exports = router;
