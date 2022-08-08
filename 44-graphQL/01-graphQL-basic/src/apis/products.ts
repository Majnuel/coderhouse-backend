import { products } from "../mockdata/products";

const findIndex = (args: any) => {
  const index = products.findIndex((product) => product.id == args.id);
  if (index < 0) throw new Error("product not found");
  return index;
};

const getProductById = (id: number) => {
  console.log("apis!!");

  const index = findIndex(id);
  console.log("index!: ", index);

  return products[index];
};

const getAllProducts = () => products;

const createProduct = (args: any) => {
  products.push(args.data);
};

export const ProductsApi = {
  getProductById,
  getAllProducts,
  createProduct
};
