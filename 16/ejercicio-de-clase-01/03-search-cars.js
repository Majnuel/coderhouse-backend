const { options } = require("./options/mysql");
const knex = require("knex")(options);

knex("cars")
  .select("*")
  .then((cars) => {
    console.log(`found ${cars.length} cars`);
    cars.forEach((car) => {
      console.log(car.id, car.name, car.price);
    });
  })

  .catch((err) => console.log("there was an error: ", err))
  .finally(() => knex.destroy());
