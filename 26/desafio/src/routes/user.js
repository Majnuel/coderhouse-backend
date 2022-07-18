import { Router } from "express";
import { UserModel } from "../models/users";

const router = Router();

router.get("/", async (req, res) => {
  const data = await UserModel.find();
  res.json({ data });
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Invalid body fields");
    return res.status(400).json({ msg: "Invalid fields" });
  }

  const userData = {
    username,
    password,
  };

  const newUser = new UserModel(userData);

  await newUser.save();

  res.json({ data: newUser });
});

export default router;
