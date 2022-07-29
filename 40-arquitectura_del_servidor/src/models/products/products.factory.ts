import { PersistenceType } from "../../config";
import { logger } from "../../services/logger";
import ProductosAtlasDAO from "./DAOs/mongo.dao";

export type ProductsDAO = ProductosAtlasDAO;

export class ProductsFactoryDAO {
  static get(type: PersistenceType) {
    switch (type) {
      //   case PersistenceType.Memoria:
      //     logger.info("Retornando Instancia Products Memoria");
      //     return ProductosMemDAO.getInstance();

      //   case PersistenceType.FileSystem:
      //     logger.info("Retornando Instancia Products File System");
      //     return ProductosFSDAO.getInstance();

      case PersistenceType.MongoAtlas:
        logger.info("Retornando Instancia Products Mongo Atlas");
        return ProductosAtlasDAO.getInstance();

      //   case PersistenceType.LocalMongo:
      //     logger.info("Retornando Instancia Products Mongo Local");
      //     return ProductosAtlasDAO.getInstance(true);

      default:
        logger.info("Retornando Instancia Products Default");
        return ProductosAtlasDAO.getInstance();
    }
  }
}
