import MongoStore from "connect-mongo";
import config from "./index";

const ttlInSeconds = 60;

export const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_CONNECTION_STRING,
    crypto: {
      secret: config.CRYPTO,
    },
  }),
  secret: config.MONGO_STORE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlInSeconds * 1000 * 10,
  },
};
