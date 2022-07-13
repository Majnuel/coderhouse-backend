import { cartModel } from "../models/carts";
import express from "express";
import { productModel } from "../models/products";
import { logger } from "../services/logger";

export const getAllCarts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const carts = await cartModel.find();
    res.status(200).json({ carts: carts });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

// a cart will be created when a user signs up:
export const createCart = async (id: string) => {
  try {
    const newCart = { owner: id, products: [] };
    await cartModel.create(newCart);
    logger.verbose(`Cart with ID:[${id}] created`);
  } catch (err: any) {
    logger.error(`There was a error creating the cart [${id}]: ${err}`);
  }
};

export const getCartProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userID = req.session.passport?.user;
    const cart = await cartModel.find({ owner: `${userID}` });
    res.status(200).json({ cart: cart });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const addProductToCart = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userID = req.session.passport?.user;
    const cartToUpdate = await cartModel.find({ owner: `${userID}` });
    const productToAdd = await productModel.findById(productId);

    // console.log("userID from req.session.passport?.user: ", userID);
    // console.log("CART TO UPDATE!!: ", cartToUpdate[0]._id);
    // console.log(
    //   "ID OF CART TO UPDATE!!: ",
    //   JSON.stringify(cartToUpdate[0]._id).substring(1, 25)
    // );
    console.log("PRODUCT TO ADD: ", productToAdd.name);
    // console.log("QUANTITY: ", quantity);

    // no funciona, entra directamente al catch:
    if (!productToAdd)
      return res.status(404).json({ msg: "product not found!" });

    const existingProductsCopy = [...cartToUpdate[0].products];

    const indexOfItem = existingProductsCopy.findIndex(
      (item) => item.productId === productId
    );

    console.log("index of item: ", indexOfItem);
    // //si ya existe el producto en el carro sumo la cantidad:
    if (indexOfItem !== -1 && productToAdd.stock >= quantity) {
      // console.log("index of item: true ");
      existingProductsCopy[indexOfItem].quantity += quantity;
    } else if (productToAdd.stock < quantity) {
      return res.json({ msg: "quantity not available" });
    } else {
      existingProductsCopy.push({
        product: productToAdd.name,
        quantity: quantity,
        productId: productId,
      });
    }

    console.log("existingProductsCopy: ", existingProductsCopy);

    await cartModel.findOneAndUpdate(
      { _id: JSON.stringify(cartToUpdate[0]._id).substring(1, 25) },
      { products: existingProductsCopy }
    );

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
    const cartToUpdate = await cartModel.find({ owner: `${userID}` });
    const productToAdd = await productModel.findById(productId);

    if (!productToAdd)
      return res.status(404).json({ msg: "product not found!" });

    console.log("product to delete: ", productToAdd);
    console.log("cart to update: ", cartToUpdate);

    const existingProductsCopy = [...cartToUpdate[0].products];

    console.log("existingProductsCopy: ", existingProductsCopy);

    const indexOfItem = existingProductsCopy.findIndex(
      (item) => item.productId === productId
    );

    console.log("index of item: ", indexOfItem);
    // if cart does not have the product:
    if (indexOfItem === -1) {
      return res.status(404).json({ msg: "product not found in cart" });
    }
    console.log("existingProductsCopy: ", existingProductsCopy);

    await cartModel.findOneAndUpdate(
      { _id: JSON.stringify(cartToUpdate[0]._id).substring(1, 25) },
      {
        products: existingProductsCopy.filter(
          (item) => item.productId !== productId
        ),
      }
    );

    res.status(200).json({ msg: "deleted from cart" });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
