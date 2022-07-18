const { options } = require("./options/mysql");
const knex = require("knex")(options);

knex("cars")
  .where("id", ">", 7)
  .del()
  .then(() => {
    console.log("car deleted");
    return knex("cars").select("*");
  })
  .then((cars) => {
    console.log(cars);
  })

  .catch((err) => console.log("there was an error: ", err))
  .finally(() => knex.destroy());
