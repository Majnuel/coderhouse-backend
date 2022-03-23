const express = require("express");
const fs = require("fs/promises");
const app = express();

const AllData = async () => {
  const Data = await fs.readFile("./libreria.txt", "utf-8");
  const ParsedData = JSON.parse(Data);
  return ParsedData;
};

class Contenedor {
  constructor(input_name) {
    this.name = input_name;
  }
  save(product) {
    async function readData() {
      try {
        const Data = await fs.readFile("./libreria.txt", "utf-8");
        const ParsedData = JSON.parse(Data);
        product.id = ParsedData.length + 1;
        ParsedData.push(product);
        await fs.writeFile("./libreria.txt", JSON.stringify(ParsedData));
      } catch (err) {
        //si hay error es porque no existe el archivo, lo crea y guarda el producto:
        async function saveData() {
          try {
            product.id = 1;
            await fs.writeFile("./libreria.txt", JSON.stringify([product]));
            console.log("file created and item saved");
          } catch (err) {
            console.log(err);
          }
        }
        saveData();
      }
    }
    readData();
  }
  getById(id) {
    try {
      AllData().then((data) => {
        const Product = data.find((element) => element.id === id);
        // console.log(Product);
        return Product;
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      return await AllData();
    } catch (err) {
      console.log(err);
    }
  }
  deleteById(id) {
    try {
      AllData().then(async (data) => {
        const FilteredArray = data.filter((product) => product.id != id);
        await fs.writeFile("./libreria.txt", JSON.stringify(FilteredArray));
      });
    } catch (error) {
      console.log(error);
    }
  }
  deleteAll() {
    try {
      const DeleteAll = async () => {
        await fs.writeFile("./libreria.txt", JSON.stringify([]));
      };
      DeleteAll();
    } catch (err) {
      console.log(err);
    }
  }
}

// *********** Si corro el programa con los 3 productos descomentados (para que ingrese los 3 al txt al inicio), no lo hace bien, tengo que ingresarlos de a uno, aunque la funcion tenga await ******

const MiDB = new Contenedor("Libreria");
// MiDB.save({
//   title: "escuadra",
//   price: 4,
//   thumbnail: "https://place-hold.it/300x500",
// });

// MiDB.save({
//   title: "cuaderno",
//   price: 6,
//   thumbnail: "https://place-hold.it/300x500",
// });

// MiDB.save({
//   title: "lapiz",
//   price: 2,
//   thumbnail: "https://place-hold.it/300x500",
// });

// console.log(MiDB.getAll());

// const printAllProducts = async () => {
//   const products = await MiDB.getAll();
//   console.log(products);
// };

// printAllProducts();

// MiDB.deleteById(2);

// console.log(MiDB.getAll());

// console.log(MiDB.getById(1));

// MiDB.deleteAll();

app.get("/", (req, res) => {
  res.send("LOL");
});

app.get("/productos", (req, res) => {
  const printAllProducts = async () => {
    const products = await MiDB.getAll();
    return await MiDB.getAll();
  };
  console.log(printAllProducts());
  const products = printAllProducts();
  res.send(JSON.stringify(products));
});

app.get("/productoRandom", (req, res) => {
  const getRandomProduct = async () => {
    const products = await MiDB.getAll();
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let randomIndex = getRandomInt(0, products.length - 1);
    console.log(products[randomIndex]);
    return products[randomIndex];
  };
  res.json(getRandomProduct());
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
