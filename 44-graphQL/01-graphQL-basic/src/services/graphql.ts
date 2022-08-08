import { buildSchema } from "graphql";
import {
  getProduct,
  getProducts,
  createProduct
} from "../controllers/products";

export const graphqlSchema = buildSchema(`
  type Query {
    getProduct(id: Int!): Product,
    getProducts: [Product]
  }

  type Mutation {
    createProduct(data: ProductInput!): Product
  }

  type Product {
    name: String
    price: Int
    id: Int
  }

  input ProductInput {
    name: String
    price: Int
    id: Int
  }
`);

export const graphqlRoot = {
  getProduct,
  getProducts,
  createProduct
};
