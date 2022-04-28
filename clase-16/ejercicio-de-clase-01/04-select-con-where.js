const { options } = require("./options/mysql");
const knex = require("knex")(options);

knex("cars")
  //   .select("*")
  // puedo pedir lo que quiera:
  .select("name", "price")
  //   .where("name", "mercedes")
  .where("price", ">", "9000")
  //   .whereIn("id", [4, 5, 6])
  .then((cars) => {
    console.log(`found ${cars.length} cars`);
    cars.forEach((car) => {
      console.log(car.id, car.name, car.price);
    });
  })

  .catch((err) => console.log("there was an error: ", err))
  .finally(() => knex.destroy());
