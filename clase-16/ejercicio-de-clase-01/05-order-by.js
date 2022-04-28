const { options } = require("./options/mysql");
const knex = require("knex")(options);

knex("cars")
  .select("*")
  //   me trae data a partir del id:5, deja afuera los primeros 4
  //   sirve para paginación
  .offset(4)
  .orderBy("price", "desc")
  .then((cars) => {
    console.log(`found ${cars.length} cars`);
    cars.forEach((car) => {
      console.log(car.id, car.name, car.price);
    });
  })

  .catch((err) => console.log("there was an error: ", err))
  .finally(() => knex.destroy());
