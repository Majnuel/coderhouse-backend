import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { productModel } from "../models/products";
import express from "express";
interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnailURL: string;
  id: string;
  timestamp: number;
}

class Products {
  file: string;
  constructor(input_file: string) {
    this.file = input_file;
  }

  async getData() {
    const data = await fs.readFile(this.file, "utf-8");
    return JSON.parse(data);
  }

  async saveData(newData: Array<Product>) {
    await fs.writeFile(this.file, JSON.stringify(newData, null, "\t"));
  }

  async addProduct(newProduct: any) {
    const products = await this.getData();
    const newData: Product = {
      name: newProduct.name,
      description: newProduct.description,
      stock: newProduct.stock,
      price: newProduct.price,
      thumbnailURL: newProduct.thumbnailURL,
      id: uuidv4(),
      timestamp: Date.now(),
    };
    products.push(newData);
    await this.saveData(products);
  }

  async getProduct(id: string) {
    const allProducts = await this.getData();
    const productToBeFound = allProducts.find(
      (product: any) => product.id === id
    );
    return productToBeFound;
  }

  async updateProduct(
    id: string,
    name: string,
    description: string,
    stock: number,
    price: number,
    thumbnailURL: string
  ) {
    const allProducts = await this.getData();
    const product = allProducts.find((element: any) => element.id === id);
    if (!product) {
      return false;
    } else {
      const index = allProducts.findIndex((element: any) => element.id === id);
      allProducts[index].name = name;
      allProducts[index].description = description;
      allProducts[index].stock = stock;
      allProducts[index].price = price;
      allProducts[index].thumbnailURL = thumbnailURL;
      allProducts[index].timestamp = Date.now();
      await this.saveData(allProducts);
      return true;
    }
  }

  async deleteProduct(id: string) {
    const allProducts = await this.getData();
    const index = allProducts.findIndex((element: any) => element.id == id);
    allProducts.splice(index, 1);
    await this.saveData(allProducts);
    if (index < 0) {
      return false;
    } else {
      return true;
    }
  }
}

const myProducts = new Products("productsDB.json");

export default myProducts;

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
