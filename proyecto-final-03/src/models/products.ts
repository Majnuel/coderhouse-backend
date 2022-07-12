const mongoose = require("mongoose");

const productsCollection = "products";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, max: 100 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, require: true, max: 1000 },
    thumbnailURL: { type: String, require: true, max: 250 },
    categoryID: { type: String, require: true, max: 100 },
  },
  { timestamps: true, versionKey: false }
);

const productModel = mongoose.model(productsCollection, productSchema);

export { productModel };
