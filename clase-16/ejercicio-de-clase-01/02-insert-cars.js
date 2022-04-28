// const { options } = require("./options/mysql");
const { options } = require("./options/sqlite");
const knex = require("knex")(options);

const cars = [
  { name: "bmw", price: 10000 },
  { name: "mercedes", price: 12000 },
  { name: "audi", price: 9500 },
  { name: "peugeot", price: 8000 },
  { name: "honda", price: 7000 },
  { name: "chevrolet", price: 5000 },
  { name: "fiat", price: 2000 },
];

knex("cars")
  .insert(cars)
  .then(() => console.log("data inserted"))
  .catch((err) => console.log("there was an error: ", err))
  .finally(() => knex.destroy());
