const { v4: uuidv4 } = require("uuid");

class Producto {
  title;
  price;
  thumbnail;
  id;
  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.productos = [
      { title: title, price: price, thumbnail: thumbnail, id: uuidv4() },
    ];
  }
  addProduct(title, price, thumbnail) {
    const newProduct = {
      title: title,
      price: price,
      thumbnail: thumbnail,
      id: uuidv4(),
    };
    this.productos.push(newProduct);
  }
  getAll() {
    return this.productos;
  }
}

const misProductos = new Producto("cuaderno", 45, "https://place-hold.it/300");
misProductos.addProduct("lapicera", 7, "https://place-hold.it/300");
// console.log(misProductos.getAll());
