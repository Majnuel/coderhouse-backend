export const productsDBConfig = {
  client: "mysql",
  connection: {
    host: "192.168.64.2",
    user: "root",
    password: "",
    database: "products",
  },
  pool: { min: 0, max: 7 },
};

export const messagesDBConfig = {
  client: "sqlite3",
  connection: { filename: "./db/messages.sqlite" },
  useNullAsDefault: true,
};
