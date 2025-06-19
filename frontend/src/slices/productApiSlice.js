import { PRODUCTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

const endpoints = (builder) => ({
  getProducts: builder.query({
    query: () => ({
      url: PRODUCTS_URL,
    }),
    keepUnusedDataFor: 5, // 5 seconds
  }),
});
export const productsApiSlice = apiSlice.injectEndpoints({ endpoints });

export const { useGetProductsQuery } = productsApiSlice;
