import { productModel } from "../models/products";
import express from "express";

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ products: products });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newProduct = { ...req.body };
    await productModel.create(newProduct);
    res.status(201).json({ ...newProduct });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const getProductByID = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    res.status(200).json({ product: product });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteByID = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "product deleted" });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { name, description, stock, categoryID, price, thumbnailURL } =
      req.body;
    let productToUpdate = await productModel.findById(id);

    //no funciona, entra directo al catch:
    if (!productToUpdate)
      return res.status(404).json({ msg: "product not found!" });

    await productModel.findByIdAndUpdate(
      id,
      { name, description, stock, price, categoryID, thumbnailURL },
      { new: true }
    );

    res.status(200).json({ msg: "product updated" });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
