import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const endpoints = (builder) => ({
  getMyOrders: builder.query({
    query: () => ({
      url: `${ORDERS_URL}/myorders`,
      method: "GET",
    }),
  }),
  addToCart: builder.mutation({
    query: (orderData) => ({
      url: ORDERS_URL,
      method: "POST",
      body: { ...orderData },
    }),
  }),
  getMyOrderById: builder.query({
    query: (id) => ({
      url: `${ORDERS_URL}/${id}`,
      method: "GET",
    }),
    keepUnusedDataFor: 5, // Keep data for 5 seconds
  }),
  updatePaid: builder.mutation({
    query: ({ id, paymentResult }) => ({
      url: `${ORDERS_URL}/${id}/pay`,
      method: "PUT",
      body: { ...paymentResult },
    }),
  }),
  getAllOrders: builder.query({
    query: () => ({
      url: ORDERS_URL,
      method: "GET",
    }),
  }),
  updateDelivered: builder.mutation({
    query: (id) => ({
      url: `${ORDERS_URL}/${id}/delivered`,
      method: "PUT",
    }),
  }),
});

export const ordersApiSlice = apiSlice.injectEndpoints({ endpoints });
export const {
  useGetMyOrdersQuery,
  useGetMyOrderByIdQuery,
  useAddToCartMutation,
  useUpdatePaidMutation,
  useGetAllOrdersQuery,
  useUpdateDeliveredMutation,
} = ordersApiSlice;
