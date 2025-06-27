import { createSlice } from "@reduxjs/toolkit";
import { calculatePrices } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { orderItems: [], shippingAddress: {}, paymentMethod: "Paypal" };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      console.log(JSON.stringify(state));
      const orderItems = state.orderItems;
      const index = orderItems.findIndex((x) => x._id === newItem._id);

      if (index !== -1) {
        orderItems[index] = newItem; // Update existing item
      } else {
        orderItems.push(newItem); // Add new item
      }

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calculatePrices(orderItems);

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
      const orderItems = state.orderItems.filter((item) => item._id !== itemId);
      state.orderItems = orderItems;

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calculatePrices(orderItems);

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
    clearCart: (state) => {
      state.orderItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
