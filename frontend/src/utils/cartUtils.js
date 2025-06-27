export const addDecimals = (num) => {
  return Math.round(num * 100) / 100;
};

export const getNoOfItemsInCart = (orderItems) => {
  return orderItems.reduce((acc, item) => acc + item.qty, 0);
};

export const getTotalPrice = (orderItems) => {
  return addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
};

export const calculatePrices = (orderItems) => {
  const itemsPrice = getTotalPrice(orderItems);

  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);

  const taxPrice = addDecimals(itemsPrice * 0.15);

  const totalPrice = addDecimals(itemsPrice + shippingPrice + taxPrice);

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
