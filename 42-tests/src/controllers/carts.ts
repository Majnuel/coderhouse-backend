import { cartModel } from "../models/carts";
import express from "express";
import { logger } from "../services/logger";
import {
  allCarts,
  getCartByUser,
  addToCart,
  deleteFromCart,
  newCart,
} from "../api/carts";

export const getAllCarts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const carts = await allCarts();
    res.status(200).json({ carts: carts });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

// a cart will be created automatically when a user signs up:
export const createCart = async (id: string) => newCart(id);

export const getCartProducts = async (
  req: express.Request,
  res: express.Response
) => {
  const userID = req.session.passport?.user;
  const cart = await getCartByUser(userID);
  res.status(200).json({ cart: cart });
};

export const addProductToCart = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userID = req.session.passport?.user;
    await addToCart(userID, productId, quantity);

    res.status(200).json({ msg: "product added to cart" });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteProductFromCart = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { productId } = req.params;
    const userID = req.session.passport?.user;
    await deleteFromCart(userID, productId);

    res.status(200).json({ msg: "deleted from cart" });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
