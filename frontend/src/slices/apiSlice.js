import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { createApi } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
