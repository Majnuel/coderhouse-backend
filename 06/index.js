const http = require("http");
const d = new Date();
let time = d.getHours();

const greeting = (hour) => {
  if (hour < 6 && hour > 12) {
    return "buenos dias";
  } else if (hour < 13 && hour > 19) {
    return "buenas tardes";
  } else {
    return "buenas noches";
  }
};
const server = http.createServer((peticion, respuesta) => {
  let saludo = greeting(time);
  respuesta.end(saludo.toString());
});

const connectedServer = server.listen(8080, () => {
  console.log(
    `Servidor Http escuchando en el puerto ${connectedServer.address().port}`
  );

  console.log(time);
});
