import mongoose from "mongoose";
import {
  ProductBaseClass,
  ProductI,
  ProductsDTO,
  ProductQuery,
} from "../products.interfaces";
import { ApiError, ErrorStatus } from "../../../api/error";
import { MongoDBClient } from "../../../services/database";
import { logger } from "../../../services/logger";

export default class ProductsDao implements ProductBaseClass {
  private static instance: ProductsDao;
  private static client: MongoDBClient;
  private schema = new mongoose.Schema(
    {
      name: { type: String, require: true, max: 100 },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      description: { type: String, require: true, max: 1000 },
      categoryID: { type: String, require: true, max: 100 },
      thumbnailURL: { type: String, require: true, max: 250 },
    },
    { timestamps: true, versionKey: false }
  );
  private products = mongoose.model<ProductI>("products", this.schema);

  static async getInstance() {
    if (!ProductsDao.instance) {
      logger.info("Initializing Products DAO");
      //   await MongoDBClient.getConnection();
      ProductsDao.instance = new ProductsDao();
      ProductsDao.client = await MongoDBClient.getConnection();
    }
    return ProductsDao.instance;
  }

  isValid(id: string): boolean {
    return ProductsDao.client.isValidId(id);
  }

  async get(id?: string): Promise<ProductsDTO[] | ProductsDTO> {
    let output: ProductI[] = [];

    if (id) {
      if (!this.isValid(id))
        throw new ApiError("Documento no existe", ErrorStatus.NotFound);
      const document = await this.products.findById(id);
      if (document) return new ProductsDTO(document);
      else throw new ApiError("Documento no existe", ErrorStatus.NotFound);
    }
    output = await this.products.find();
    return output.map((aProduct) => new ProductsDTO(aProduct));
  }

  async add(data: ProductI): Promise<ProductsDTO> {
    const newProduct = await this.products.create(data);
    return new ProductsDTO(newProduct);
  }

  async update(id: string, newProductData: ProductI): Promise<ProductsDTO> {
    const result = await this.products.findByIdAndUpdate(id, newProductData, {
      new: true,
    });
    if (!result)
      throw new ApiError("Documento no existe", ErrorStatus.NotFound);
    return new ProductsDTO(result);
  }

  async delete(id: string) {
    await this.products.findByIdAndDelete(id);
  }

  async query(options: ProductQuery): Promise<ProductsDTO[]> {
    let query: ProductQuery = {};

    if (options.name) query.name = options.name;

    if (options.price) query.price = options.price;

    const result = await this.products.find(query);

    return result.map((aResult) => new ProductsDTO(aResult));
  }
}
