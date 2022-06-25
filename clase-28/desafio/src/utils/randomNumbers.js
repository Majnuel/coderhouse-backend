function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomNumberFunc = (numberQuantity) => {
  const randoms = {};

  for (let i = 0; i < numberQuantity; i++) {
    const randomNumber = parseFloat(randomIntFromInterval(1, 1000).toFixed(2));
    if (!randoms[randomNumber]) {
      randoms[randomNumber] = 1;
    } else if (randoms[randomNumber]) {
      randoms[randomNumber] += 1;
    }
  }

  return randoms;
};

export const calculo = () => {
  let sum = 0;
  for (let i = 0; i < 6e9; i++) {
    sum += i;
  }
  return sum;
};

process.on("message", (quantity) => {
  console.log("Start calculo con cantidad: ", quantity);
  const result = randomNumberFunc(quantity);

  process.send(result);
});
