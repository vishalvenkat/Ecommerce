import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";

const endpoints = (builder) => ({
  login: builder.mutation({
    query: (credentials) => ({
      url: `${USERS_URL}/login`,
      method: "POST",
      body: credentials,
    }),
  }),
  logout: builder.mutation({
    query: () => ({
      url: `${USERS_URL}/logout`,
      method: "POST",
    }),
  }),
});

export const userApiSlice = apiSlice.injectEndpoints({ endpoints });

export const { useLoginMutation, useLogoutMutation } = userApiSlice;
