import { ProductsApi } from "../apis/products";

export const getProduct = (id: number) => {
  return ProductsApi.getProductById(id);
};

export const createProduct = (args: any) => {
  return ProductsApi.createProduct(args);
};

export const getProducts = () => ProductsApi.getAllProducts();
