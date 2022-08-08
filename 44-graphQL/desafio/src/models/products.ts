const mongoose = require("mongoose");
import { composeWithMongoose } from "graphql-compose-mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, max: 100 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, require: true, max: 1000 },
    categoryID: { type: String, require: true, max: 100 },
    thumbnailURL: { type: String, require: true, max: 250 }
  },
  { timestamps: true, versionKey: false }
);

const productModel = mongoose.model(productsCollection, productSchema);

const ProductGraphQLModel = composeWithMongoose(productModel);

export { productModel, ProductGraphQLModel };
