import fs from "fs/promises";

import { productsDBConfig } from "../../db/knexConfig";
const knex = require("knex")(productsDBConfig);

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: string;
}

class Products {
  file: string;
  constructor(input_file: string) {
    this.file = input_file;
  }

  init() {
    console.log("products DB up");
    knex.schema.hasTable("products").then((exists: boolean) => {
      if (exists) return;
      console.log("products table doesnt exist, creating table...");
      knex.schema
        .createTable("products", (table: any) => {
          table.increments("id");
          table.string("name").notNullable();
          table.decimal("price", 6, 2).notNullable();
          table.string("description").notNullable();
          table.integer("stock").notNullable();
          table.string("thumbnail").notNullable();
          table.timestamps(true, true);
        })
        .then(() => console.log("products table created"))
        .catch((err: any) => console.log("there has been an error", err));
    });
    knex("products")
      .select("*")
      .then((products: any) =>
        console.log(`found ${products.length} product-records in products-DB`)
      );
  }

  getAllProducts() {
    return knex("products").select("*");
  }

  getProductById(id: number) {
    return knex("products").select("*").where("id", "=", id);
  }

  addProduct(newProduct: any) {
    const product: Product = {
      name: newProduct.name,
      description: newProduct.description,
      stock: newProduct.stock,
      price: newProduct.price,
      thumbnail: newProduct.thumbnail,
    };
    return knex("products").insert(product);
  }

  //************ */ DELETE, IF DONE NOW IT BREAKS EVERYTHING
  async getData() {
    const data = await fs.readFile(this.file, "utf-8");
    return JSON.parse(data);
  }

  async getProduct(id: string) {
    const allProducts = await this.getData();
    const productToBeFound = allProducts.find(
      (product: any) => product.id === id
    );
    return productToBeFound;
  }
  // *********************************

  async updateProduct(
    id: string,
    name: string,
    description: string,
    stock: number,
    price: number,
    thumbnail: string
  ) {
    const newData = {
      name: name,
      description: description,
      stock: stock,
      price: price,
      thumbnail: thumbnail,
    };
    return knex("products")
      .where("id", "=", id)
      .update({ ...newData });
  }

  async deleteProduct(id: string) {
    return knex("products").where("id", "=", id).del();
  }
}

const myProducts = new Products("productsDB.json");

export default myProducts;
