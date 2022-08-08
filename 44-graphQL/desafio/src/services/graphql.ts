const { SchemaComposer } = require("graphql-compose");
import { ProductQueries, ProductMutations } from "../controllers/graphql";

const schemaComposer = new SchemaComposer();

// const ezio = () => console.log("test");

const newUser = schemaComposer.createObjectTC({
  name: "user",
  fields: {
    username: "String!",
    password: "String!",
    name: "String!",
    address: "String!",
    age: "Int!",
    phone: "String!"
  }
});

schemaComposer.Query.addFields({
  ...ProductQueries
});

// schemaComposer.Query.addFields({ ezio: "user" });

schemaComposer.Mutation.addFields({
  ...ProductMutations
});

export const graphQLMainSchema = schemaComposer.buildSchema();

// export const graphqlRoot = {
//   ezio
// };
