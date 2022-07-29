import { productModel } from "../models/products";

export const allProducts = () => {
  return productModel.find();
};

export const newProduct = (productData: Object): void => {
  console.log("CREATING PRODUCT XIXOXOXOXOXOXOXOXOOXOXOXOXOX");
  console.log("PRODUCT DATA: ", productData);
  console.log(
    "MONGO DB CREATE: ",
    productModel
      .create(productData)
      .then((response: any) => console.log(response))
  );
};

export const getById = (id: string) => {
  return productModel.findById(id);
};

export const deleteProduct = async (id: string) => {
  await productModel.findByIdAndDelete(id);
};

export const update = async (
  id: string,
  name: string,
  description: string,
  stock: number,
  price: number,
  categoryID: string,
  thumbnailURL: string
) => {
  let productToUpdate = await productModel.findById(id);
  await productModel.findByIdAndUpdate(
    id,
    { name, description, stock, price, categoryID, thumbnailURL },
    { new: true }
  );
};
