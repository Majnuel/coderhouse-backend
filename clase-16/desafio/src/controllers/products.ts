import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

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
