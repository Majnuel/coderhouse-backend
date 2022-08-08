import { ProductGraphQLModel } from "../models/products";

export const ProductQueries = {
  productById: ProductGraphQLModel.getResolver("findById"),
  productsByIds: ProductGraphQLModel.getResolver("findByIds"),
  productOne: ProductGraphQLModel.getResolver("findOne"),
  productsMany: ProductGraphQLModel.getResolver("findMany")
  //   taskCount: ProductGraphQLModel.getResolver("count"),
  //   taskConnection: ProductGraphQLModel.getResolver("connection"),
  //   taskPagination: ProductGraphQLModel.getResolver("pagination")
};

export const ProductMutations = {
  productCreateOne: ProductGraphQLModel.getResolver("createOne"),
  //   taskCreateMany: ProductGraphQLModel.getResolver("createMany"),
  productUpdateById: ProductGraphQLModel.getResolver("updateById"),
  //   taskUpdateOne: ProductGraphQLModel.getResolver("updateOne"),
  //   taskUpdateMany: ProductGraphQLModel.getResolver("updateMany"),
  productRemoveById: ProductGraphQLModel.getResolver("removeById")
  //   taskRemoveOne: ProductGraphQLModel.getResolver("removeOne"),
  //   taskRemoveMany: ProductGraphQLModel.getResolver("removeMany")
};
