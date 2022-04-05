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
    return newProduct;
  }

  getAll() {
    return this.productos;
  }

  updateProduct(title, price, thumbnail, id) {
    let index = this.productos.findIndex((product) => product.id === id);
    this.productos[index] = {
      title: title,
      pric: price,
      thumbnail: thumbnail,
      id: id,
    };
  }

  deleteProduct(id) {
    const productToDelete = this.productos.filter(
      (products) => products.id === id
    );
    if (productToDelete == []) {
      return false;
    } else if (productToDelete !== []) {
      this.productos = this.productos.filter((products) => products.id !== id);
      return true;
    }
  }
}

const misProductos = new Producto("cuaderno", 45, "https://place-hold.it/300");

module.exports = misProductos;
