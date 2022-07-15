class Usuario {
  nombre;
  apellido;
  libros;
  mascotas;
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(pet) {
    this.mascotas.push(pet);
  }
  countMascota() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    const newBook = {
      nombre: nombre,
      autor: autor,
    };
    this.libros.push(newBook);
  }
  getBookNames() {
    const BookNameArray = [];
    this.libros.forEach((element) => {
      BookNameArray.push(element.nombre);
    });
    return BookNameArray;
  }
}

const Usuario1 = new Usuario(
  "Lara",
  "Croft",
  [{ nombre: "El Señor de los Anillos", autor: "Tolkien" }],
  ["hamster"]
);
console.log(Usuario1.getFullName());
Usuario1.addMascota("otro hamster");
console.log(Usuario1.countMascota());
Usuario1.addBook("The Hitchhikers Guide to the Galaxy", "Doublas Adams");
console.log(Usuario1.getBookNames());
console.log(Usuario1);
