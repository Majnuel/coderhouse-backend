// const between = (min, max) => {
//   return Math.floor(Math.random() * (max - min) + min);
// };
// const obj = {};
// for (let index = 0; index < 10000; index++) {
//   const number = between(1, 21);
//   //   console.log(number);
//   if (obj[number]) {
//     obj[number] = obj[number] + 1;
//   } else {
//     obj[number] = 1;
//   }
// }
// console.log(obj);

// const quantity = 0;
// for (const property in obj) {
//   quantity = quantity + property;
// }
// console.log(quantity);

const productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 234.56 },
  { id: 3, nombre: "Globo Terráqueo", precio: 45.67 },
  { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
  { id: 5, nombre: "Reloj", precio: 67.89 },
  { id: 6, nombre: "Agenda", precio: 78.9 },
];

const NombresProductos = () => {
  const nombres = productos.map((element) => element.nombre);
  const nombresString = nombres.join(", ");
  return nombresString;
};

const PrecioTotal = () => {
  let total;
  for (const precio in productos) {
    total = total + precio;
  }
  console.log(total);
};

// NombresProductos();
PrecioTotal();
