import { REVIEWS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const endpoints = (builder) => ({
  createReviews: builder.mutation({
    query: (review) => ({
      url: REVIEWS_URL,
      method: "POST",
      body: review,
    }),
  }),
});
export const reviewApiSlice = apiSlice.injectEndpoints({ endpoints });

export const { useCreateReviewsMutation } = reviewApiSlice;
