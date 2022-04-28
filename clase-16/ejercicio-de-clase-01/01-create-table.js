// const { options } = require("./options/mysql");
const { options } = require("./options/sqlite");
const knex = require("knex")(options);

knex.schema
  .createTable("cars", (table) => {
    table.increments("id");
    table.string("name");
    table.integer("price");
  })
  .then(() => console.log("table created!"))
  .catch((err) => console.log("there has been an error", err))
  .finally(() => {
    knex.destroy();
  });
