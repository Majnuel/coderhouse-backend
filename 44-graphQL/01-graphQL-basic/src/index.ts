import Server from "./services/server";

Server.listen(8080, () => {
  console.log("SERVER UP AND RUNNING ON PORT 8080");
});
