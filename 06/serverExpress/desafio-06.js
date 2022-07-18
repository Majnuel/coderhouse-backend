const express = require("express");
const app = express();
const fs = require("fs");

class DB {
  // solo usar funciones sincronicas en constructor
  constructor() {
    this.productos = [];
    if (!fs.existsSync("./libreria.json")) {
      const initialData = [
        {
          title: "escuadra",
          price: 4,
          thumbnail: "https://place-hold.it/300x500",
          id: 1,
        },
        {
          title: "cuaderno",
          price: 6,
          thumbnail: "https://place-hold.it/300x500",
          id: 2,
        },
        {
          title: "lapiz",
          price: 2,
          thumbnail: "https://place-hold.it/300x500",
          id: 3,
        },
      ];
      fs.writeFileSync(
        "./libreria.json",
        JSON.stringify(initialData, null, "\t")
      );
      console.log("new file created");
    } else {
      this.productos = JSON.parse(fs.readFileSync("libreria.json", "utf-8"));
    }
  }
  readFile() {
    const data = fs.readFileSync("./libreria.json", "utf-8");
    return JSON.parse(data);
  }

  readFilePromise() {
    return new Promise((resolve, reject) => {
      fs.promises
        .readFile("./libreria.json")
        .then((data) => {
          resolve(JSON.parse(data));
        })
        .catch((err) => {
          console.log("there was an error: ", err);
          reject(err);
        });
    });
  }

  async readFileAsync() {
    const data = await fs.promises.readFile("./libreria.json", "utf-8");
    return JSON.parse(data);
  }
}

const miDB = new DB();
// miDB.readFilePromise().then((data) => console.log(data));
// console.log(miDB.readFileAsync());
// console.log(miDB.productos);

app.get("/", (req, res) => {
  res.send("main page");
});

app.get("/productos", async (req, res) => {
  let data = await miDB.readFileAsync().then((data) => data);
  res.send(data);
});

app.get("/productoRandom", async (req, res) => {
  let data = await miDB.readFileAsync().then((data) => data);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomNumber = getRandomInt(0, data.length - 1);

  res.send(JSON.stringify(data[randomNumber]));
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
