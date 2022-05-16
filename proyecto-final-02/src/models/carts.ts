const mongoose = require("mongoose");

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema(
  {
    products: { type: Array, required: false },
  },
  { timestamps: true, versionKey: false }
);

const cartModel = mongoose.model(cartsCollection, cartSchema);

export { cartModel };
