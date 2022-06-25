import faker from "@faker-js/faker";

const productArray = [];
for (let i = 0; i < 5; i++) {
  const newProduct = {
    name: faker.commerce.productName(),
    price: faker.finance.amount(),
    thumbnail: faker.internet.avatar(),
  };
  productArray.push(newProduct);
}

export default productArray;
