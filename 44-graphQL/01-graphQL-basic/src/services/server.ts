import express from "express";
import * as http from "http";
import { graphqlHTTP } from "express-graphql";
import { graphqlRoot, graphqlSchema } from "./graphql";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlRoot,
    graphiql: true
  })
);

const HTTPServer = http.createServer(app);

export default HTTPServer;
