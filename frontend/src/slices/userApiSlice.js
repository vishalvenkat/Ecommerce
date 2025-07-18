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
  register: builder.mutation({
    query: (data) => ({
      url: `${USERS_URL}/register`,
      method: "POST",
      body: data,
    }),
  }),
  getUserProfile: builder.query({
    query: () => ({
      url: `${USERS_URL}/profile`,
      method: "GET",
    }),
  }),
  updateUserProfile: builder.mutation({
    query: (data) => ({
      url: `${USERS_URL}/profile`,
      method: "PUT",
      body: data,
    }),
  }),
  getAllUsers: builder.query({
    query: () => ({
      url: USERS_URL,
      method: "GET",
    }),
    providesTags: ["User"],
    keepUnusedDataFor: 5, // 5 seconds
  }),
  deleteUser: builder.mutation({
    query: (id) => ({
      url: `${USERS_URL}/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["User"],
  }),
  getUserById: builder.query({
    query: (id) => ({
      url: `${USERS_URL}/${id}`,
      method: "GET",
    }),
    keepUnusedDataFor: 5, // 5 seconds
    invalidatesTags: ["User"],
  }),
  updateUserById: builder.mutation({
    query: ({ id, ...data }) => ({
      url: `${USERS_URL}/${id}`,
      method: "PUT",
      body: data,
    }),
  }),
});

export const userApiSlice = apiSlice.injectEndpoints({ endpoints });

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} = userApiSlice;
