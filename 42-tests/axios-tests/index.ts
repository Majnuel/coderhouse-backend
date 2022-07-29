import axios from "axios";
import util from "util";

class AxiosTest {
  constructor() {}

  getProducts(url: string) {
    axios
      .get(url)
      .then((response) => {
        console.log("response: ", util.inspect(response.data, true, 7, true));
      })
      .catch((err) => console.log("error: ", err));
  }

  addProduct(url: string, product: Object) {
    axios
      .post(url, product)
      .then((response) =>
        console.log("response: ", util.inspect(response.data, true, 7, true))
      )
      .catch((err) => console.log(err));
  }

  updateProduct(url: string, product: Object) {
    axios
      .put(url, product)
      .then((response) =>
        console.log("response: ", util.inspect(response.data, true, 7, true))
      )
      .catch((err) => console.log(err));
  }

  deleteProduct(url: string) {
    axios
      .delete(url)
      .then((response) =>
        console.log("response: ", util.inspect(response.data, true, 7, true))
      )
      .catch((err) => console.log(err));
  }
}

const axiosInstance = new AxiosTest();

// PRODUCT LIST:
axiosInstance.getProducts("http://localhost:8081/api/products");

// ADD PRODUCT:
// axiosInstance.addProduct("http://localhost:8081/api/products", {
//   name: "laser gun",
//   price: 15000,
//   stock: 15,
//   description: "zzzuummm",
//   thumbnailURL: "https://picsum.photos/200",
//   categoryID: "cut through anything",
// });

// UPDATE PRODUCT:
// axiosInstance.updateProduct(
//   "http://localhost:8081/api/products/62e1a81478b03fe7bc78c8ab",
//   {
//     name: "laser machine gun",
//     price: 25000,
//     stock: 5,
//     description: "zzzuummm X10",
//     categoryID: "cut through anything, MANY TIMES",
//     thumbnailURL: "https://picsum.photos/200",
//   }
// );

// DELETE PRODUCT:
// axiosInstance.deleteProduct(
//   "http://localhost:8081/api/products/62e1a74678b03fe7bc78c8a8"
// );
