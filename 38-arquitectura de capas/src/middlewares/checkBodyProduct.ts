import express from "express";

export const checkBodyProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, description, stock, price, categoryID, thumbnailURL } =
    req.body;
  if (
    !name ||
    !description ||
    !stock ||
    !price ||
    !categoryID ||
    !thumbnailURL
  ) {
    return res.status(400).json({ msg: "missing body fields" });
  }
  next();
};
