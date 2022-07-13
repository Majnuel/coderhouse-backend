// returns html string content for email:

export const productListForEmail = (list: any) => {
  let productsArray: any = [];
  list.forEach((item: any) => {
    productsArray.push(
      `<li>${item.product} x ${item.quantity} unidades - productID: ${item.productId}</li>`
    );
  });
  return productsArray.join("");
};

export const productListForWhatsapp = (list: any) => {
  let productsArray: any = [];
  list.forEach((item: any) => {
    productsArray.push(
      `** ${item.product} x ${item.quantity} unidades.\nProductID: ${item.productId} \n\n`
    );
  });
  return productsArray.join("");
};
