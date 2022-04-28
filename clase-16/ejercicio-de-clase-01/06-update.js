// const { options } = require("./options/mysql");
const { options } = require("./options/sqlite");
const knex = require("knex")(options);

knex("cars")
  .where("name", "honda")
  .update({
    price: 7500,
  })
  .then(() => {
    console.log("car updated");
    return knex("cars").where("name", "honda");
  })
  .then((car) => {
    console.log(car);
  })

  .catch((err) => console.log("there was an error: ", err))
  .finally(() => knex.destroy());
