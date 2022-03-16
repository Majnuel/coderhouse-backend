const fs = require("fs/promises");

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
        //si hay error porque no existe el archivo, lo crea y guarda el producto:
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
      const Data = async () => {
        const ReadData = await fs.readFile("./libreria.txt", "utf-8");
        return ReadData;
      };
      Data().then((data) => {
        const ParsedData = JSON.parse(data);
        // console.log(ParsedData);
        const Product = ParsedData.find((element) => element.id === id);
        console.log(Product);
        return Product;
      });
    } catch (error) {
      console.log(error);
    }
  }
  getAll() {
    try {
      const AllData = async () => {
        const Data = await fs.readFile("./libreria.txt", "utf-8");
        const ParsedData = JSON.parse(Data);
        return ParsedData;
      };
      // ************** cómo hago para retornar el valor en lugar de logearlo en consola? con return data no funciona, me sale undefined **********
      // AllData().then((data) => data); // no funciona
      AllData().then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    }
  }
  deleteById(id) {
    try {
      const AllData = async () => {
        const Data = await fs.readFile("./libreria.txt", "utf-8");
        const ParsedData = JSON.parse(Data);
        return ParsedData;
      };
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
MiDB.save({
  title: "escuadra",
  price: 4,
  thumbnail: "https://place-hold.it/300x500",
});

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

// MiDB.deleteById(2);

// console.log(MiDB.getAll());

// console.log(MiDB.getById(1));

// MiDB.deleteAll();
