import { Router } from "express";
import express from "express";
import { fork } from "child_process";
import path from "path";

const scriptPath = path.resolve(__dirname, "../utils/randomNumbers.js");

const router = Router();

router.get("/random", (req, res) => {
  const { cant } = req.query;
  let numberQuantity;
  const computo = fork(scriptPath);
  if (!cant) {
    numberQuantity = 100000000;
    computo.send(numberQuantity);
  } else {
    numberQuantity = cant;
    computo.send(numberQuantity);
  }

  computo.on("message", (result) => {
    res.json({
      resultado: result,
    });
  });
});

export default router;
