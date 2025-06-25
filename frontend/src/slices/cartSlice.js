import { createSlice } from "@reduxjs/toolkit";
import { calculatePrices } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Paypal" };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      console.log(JSON.stringify(state));
      const cartItems = state.cartItems;
      const index = cartItems.findIndex((x) => x._id === newItem._id);

      if (index !== -1) {
        cartItems[index] = newItem; // Update existing item
      } else {
        cartItems.push(newItem); // Add new item
      }

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calculatePrices(cartItems);

      Object.assign(state, {
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const cartItems = state.cartItems.filter((item) => item._id !== itemId);
      state.cartItems = cartItems;

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calculatePrices(cartItems);

      Object.assign(state, {
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
