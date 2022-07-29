export interface ProductI {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryID: string;
  thumbnailURL: string;
}

export interface ProductQuery {
  name?: string;
  price?: number;
  stock?: number;
}

export interface ProductBaseClass {
  get(id?: string): Promise<ProductsDTO[] | ProductsDTO>;
  add(data: ProductI): Promise<ProductsDTO>;
  update(id: string, newProductData: ProductI): Promise<ProductsDTO>;
  delete(id: string): Promise<void>;
  query(options: ProductQuery): Promise<ProductsDTO[]>;
}

export class ProductsDTO {
  id: string;
  name: string;
  price: number;
  hasStock: boolean;
  stock: number;

  constructor(data: ProductI) {
    this.name = data.name;
    this.price = data.price;
    this.hasStock = data.stock > 0;
    this.stock = data.stock;
    this.id = data._id || "";
  }
}
