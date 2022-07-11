import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import myProducts from "./products";
import { cartModel } from "../models/carts";
import express from "express";
import { productModel } from "../models/products";

// class Cart {
//   file: string;
//   constructor(input_file: string) {
//     this.file = input_file;
//   }
//   async getData() {
//     const data = await fs.readFile(this.file, "utf-8");
//     return JSON.parse(data);
//   }

//   async saveData(data: object) {
//     fs.writeFile(this.file, JSON.stringify(data, null, "\t"));
//   }

//   async createCart() {
//     const allCarts = await this.getData();
//     const newCart = {
//       id: uuidv4(),
//       products: [],
//     };
//     allCarts.push(newCart);
//     this.saveData(allCarts);
//     return newCart;
//   }

//   async deleteCart(id: string) {
//     const allCarts = await this.getData();
//     const index = allCarts.findIndex((cart: any) => cart.id === id);
//     if (index !== -1) {
//       allCarts.splice(index, 1);
//       this.saveData(allCarts);
//       return true;
//     } else {
//       return false;
//     }
//   }

//   async getCart(id: string) {
//     const allCarts = await this.getData();
//     const index = allCarts.findIndex((cart: any) => cart.id === id);
//     if (index === -1) return false;
//     else return allCarts[index];
//   }

//   async addProduct(cartId: string, productId: string) {
//     const allCarts = await this.getData();
//     const product = await myProducts.getProduct(productId);
//     const cartIndex = allCarts.findIndex((cart: any) => cart.id === cartId);
//     // check if cart and product exist:
//     if (cartIndex === -1) {
//       return {
//         output: false,
//         msg: "cart does not exist",
//       };
//     } else if (!product) {
//       return {
//         output: false,
//         msg: "product does not exist",
//       };
//     }

//     // check if cart already has the product:
//     const productIndexInCart = allCarts[cartIndex].products.findIndex(
//       (product: any) => product.id === productId
//     );
//     // si no existe en el carrito lo creo
//     if (product.stock > 1 && productIndexInCart === -1) {
//       const productToAdd = {
//         name: product.name,
//         id: product.id,
//         quantity: 1,
//       };
//       allCarts[cartIndex].products.push(productToAdd);
//       this.saveData(allCarts);
//       return {
//         output: true,
//         msg: "product added to cart",
//       };
//     } else if (product.stock > 1 && productIndexInCart !== -1) {
//       //si ya existe en el carro aumento la cantidad
//       allCarts[cartIndex].products[productIndexInCart].quantity++;
//       this.saveData(allCarts);
//       return {
//         output: true,
//         msg: "quantity updated in cart: +1",
//       };
//     }
//   }

//   async removeProductfromCart(cartId: string, productId: string) {
//     const allCarts = await this.getData();
//     const cartIndex = allCarts.findIndex((cart: any) => cart.id === cartId);
//     // check if cart exist:
//     if (cartIndex === -1) {
//       return {
//         output: false,
//         msg: "cart does not exist",
//       };
//     }
//     const productIndex = allCarts[cartIndex].products.findIndex(
//       (product: any) => product.id === productId
//     );
//     if (productIndex === -1) {
//       return {
//         output: false,
//         msg: "product does not exist in cart",
//       };
//     }
//     allCarts[cartIndex].products.splice(productIndex, 1);
//     this.saveData(allCarts);
//     return {
//       output: true,
//       msg: "product removed from cart",
//     };
//   }
// }

// const Carts = new Cart("cartsDB.json");

// export default Carts;

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

export const createCart = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newCart = { products: [] };
    await cartModel.create(newCart);
    res.status(201).json({ msg: "cart created", cart: { ...newCart } });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteCart = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    await cartModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "cart deleted" });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const getCartProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findById(id);
    res.status(200).json({ cartID: id, products: cart.products });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const addProductToCart = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const cartToUpdate = await cartModel.findById(cartId);
    const productToAdd = await productModel.findById(productId);

    if (!cartToUpdate) return res.status(404).json({ msg: "cart not found!" });
    if (!productToAdd)
      return res.status(404).json({ msg: "product not found!" });

    console.log("cartID: ", cartId);
    console.log("product to add: ", productToAdd);
    console.log("cart to update: ", cartToUpdate);
    console.log("quantity: ", quantity);

    const existingProductsCopy = [...cartToUpdate.products];

    const indexOfItem = existingProductsCopy.findIndex(
      (item) => item.productId === productId
    );

    console.log("index of item: ", indexOfItem);
    //si ya existe el producto en el carro sumo la cantidad
    if (indexOfItem !== -1) {
      console.log("index of item: true ");

      existingProductsCopy[indexOfItem].quantity += quantity;
    } else {
      existingProductsCopy.push({
        productId: productId,
        quantity: quantity,
      });
    }

    console.log("existingProductsCopy: ", existingProductsCopy);

    await cartModel.findOneAndUpdate(
      { _id: cartId },
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
    const { cartId, productId } = req.params;

    const cartToUpdate = await cartModel.findById(cartId);
    const productToAdd = await productModel.findById(productId);

    if (!cartToUpdate) return res.status(404).json({ msg: "cart not found!" });
    if (!productToAdd)
      return res.status(404).json({ msg: "product not found!" });

    console.log("cartID: ", cartId);
    console.log("product to add: ", productToAdd);
    console.log("cart to update: ", cartToUpdate);

    const existingProductsCopy = [...cartToUpdate.products];

    const indexOfItem = existingProductsCopy.findIndex(
      (item) => item.productId === productId
    );

    console.log("index of item: ", indexOfItem);
    //si ya existe el producto en el carro sumo la cantidad
    if (indexOfItem === -1) {
      return res.status(404).json({ msg: "product not found in cart" });
    }
    console.log("existingProductsCopy: ", existingProductsCopy);

    await cartModel.findOneAndUpdate(
      { _id: cartId },
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
