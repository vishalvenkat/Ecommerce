export const addDecimals = (num) => {
  return Math.round(num * 100) / 100;
};

export const getNoOfItemsInCart = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.qty, 0);
};

export const getTotalPrice = (cartItems) => {
  return addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
};

export const calculatePrices = (cartItems) => {
  const itemsPrice = getTotalPrice(cartItems);

  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);

  const taxPrice = addDecimals(itemsPrice * 0.15);

  const totalPrice = addDecimals(itemsPrice + shippingPrice + taxPrice);

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
