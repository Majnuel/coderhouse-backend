import { cartModel } from "../models/carts";
import { productModel } from "../models/products";
import { logger } from "../services/logger";
import { ApiError, ErrorStatus } from "./error";

export const allCarts = () => cartModel.find();

export const getCartByUser = (userId: string) =>
  cartModel.find({ owner: `${userId}` });

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const cartToUpdate = await cartModel.find({ owner: `${userId}` });
  const productToAdd = await productModel.findById(productId);

  const existingProductsCopy = [...cartToUpdate[0].products];

  const indexOfItem = existingProductsCopy.findIndex(
    (item) => item.productId === productId
  );
  if (!productToAdd) {
    throw new ApiError("Product does not exist", ErrorStatus.NotFound);
  }
  // //si ya existe el producto en el carro sumo la cantidad:
  if (indexOfItem !== -1 && productToAdd.stock >= quantity) {
    existingProductsCopy[indexOfItem].quantity += quantity;
  } else if (productToAdd.stock < quantity) {
    throw new ApiError("Quantity not available", ErrorStatus.BadRequest);
  } else {
    existingProductsCopy.push({
      product: productToAdd.name,
      quantity: quantity,
      productId: productId,
    });
  }

  await cartModel.findOneAndUpdate(
    { _id: JSON.stringify(cartToUpdate[0]._id).substring(1, 25) },
    { products: existingProductsCopy }
  );
};

export const deleteFromCart = async (userId: string, productId: string) => {
  const cartToUpdate = await cartModel.find({ owner: `${userId}` });
  const productToDelete = await productModel.findById(productId);

  if (!productToDelete) {
    throw new ApiError("Product does not exist in DB", ErrorStatus.NotFound);
  }

  const existingProductsCopy = [...cartToUpdate[0].products];

  const indexOfItem = existingProductsCopy.findIndex(
    (item) => item.productId === productId
  );
  // if cart does not have the product:
  if (indexOfItem === -1) {
    throw new ApiError("Product does not exist in cart", ErrorStatus.NotFound);
  }
  await cartModel.findOneAndUpdate(
    { _id: JSON.stringify(cartToUpdate[0]._id).substring(1, 25) },
    {
      products: existingProductsCopy.filter(
        (item) => item.productId !== productId
      ),
    }
  );
};

export const newCart = async (id: string) => {
  const newCart = { owner: id, products: [] };
  await cartModel.create(newCart);
  logger.verbose(`new cart with ID:[${id}] created`);
};
