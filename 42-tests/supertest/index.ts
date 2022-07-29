import supertest from "supertest";
import { disconnectMongoDB } from "../src/services/database";
import { server, HTTPServer } from "../src/services/server";
import { productModel } from "../src/models/products";

describe("Test E2E de Productos", () => {
  let request: any;

  beforeAll(async () => {
    request = await supertest(server);
  });

  afterEach(async () => {
    console.log(
      "EJECUTO afterEach PARA BORRAR TODO LO QUE HAYA CREADO EN LOS TESTS"
    );
    // await productModel.deleteMany();
  });

  afterAll(async () => {
    console.log("AFTER ALL: ejecuto desconexion a mongo y cierro el server");
    await productModel.deleteMany();
    await disconnectMongoDB();
    // HTTPServer.close(); //no funciona
    // server.close(); //no funciona
  });

  it("Deberia traer una lista vacia de productos", async () => {
    const expectedResponse = {
      products: []
    };

    const response = await request.get("/api/products");
    expect(response.body).toEqual(expectedResponse);
  });

  it("Debería devolver un error 404 si busco un producto que no existe", async () => {
    const response = await request.get("/api/products/QWERTY");
    expect(response.status).toEqual(404);
  });

  it("Debería devolver un error 400 si quiero crear un producto y no envío el body", async () => {
    const body = {};

    const response = await request.post("/api/products").send(body);
    expect(response.status).toEqual(400);
  });

  it("Debería devolver un error 400 si quiero crear un producto y le falta algo al body", async () => {
    const body = {
      name: "eye patch",
      price: 150,
      stock: 230,
      description: "arrrrr",
      thumbnailURL: "https://picsum.photos/200"
    };

    const response = await request.post("/api/products").send(body);
    expect(response.status).toEqual(400);
  });

  it("Debería devolver un error 400 si quiero actualizar un producto y no envío el body o le faltan campos", async () => {
    const body = {
      name: "eye patch",
      price: 150,
      stock: 230,
      description: "arrrrr"
    };

    const response = await request.put("/api/products").send(body);
    expect(response.status).toEqual(404);
  });

  it("Debería crear un producto correctamente", async () => {
    const body = {
      name: "eye patch",
      price: 150,
      stock: 230,
      description: "arrrrr",
      thumbnailURL: "https://picsum.photos/200",
      categoryID: "weareable gear"
    };
    const response = await request.post("/api/products").send(body);
    const product = await request.get("/api/products/62e1c40245dddaf2a4ff1679");
    console.log(
      "PRODUCT BODY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ",
      product.body,
      product.status
    );

    expect(response.status).toEqual(201);
  });

  it("Debería borrar un producto correctamente", async () => {
    const response = await request.delete(
      "/api/products/62e1d463edb129eff85230a9"
    );
    expect(response.status).toEqual(200);
  });
});
