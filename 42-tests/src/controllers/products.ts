import { productModel } from "../models/products";
import express from "express";
import {
  allProducts,
  deleteProduct,
  getById,
  newProduct,
  update,
} from "../api/products";

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const products = await allProducts();
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
    const product = { ...req.body };
    await newProduct(product);
    res.status(201).json({ product: product });
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
    const product = await getById(id);
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
    deleteProduct(id);
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
    update(id, name, description, stock, price, categoryID, thumbnailURL);

    res.status(200).json({ msg: "product updated" });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
