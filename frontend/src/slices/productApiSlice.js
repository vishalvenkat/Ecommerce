import { PRODUCTS_URL, UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

const endpoints = (builder) => ({
  getProducts: builder.query({
    query: () => ({
      url: PRODUCTS_URL,
    }),
    keepUnusedDataFor: 5, // 5 seconds
  }),
  getProductsById: builder.query({
    query: (id) => ({
      url: `${PRODUCTS_URL}/${id}`,
    }),
    keepUnusedDataFor: 5, // 5 seconds
    providedTags: ["Product"],
  }),
  createProduct: builder.mutation({
    query: (product) => ({
      url: PRODUCTS_URL,
      method: "POST",
      body: { ...product },
    }),
    invalidatesTags: [{ type: "Product" }],
  }),
  updateProduct: builder.mutation({
    query: ({ id, ...product }) => ({
      url: `${PRODUCTS_URL}/${id}`,
      method: "PUT",
      body: product,
    }),
    invalidatesTags: [{ type: "Product" }],
  }),
  uploadProductImage: builder.mutation({
    query: (image) => ({
      url: `${UPLOAD_URL}`,
      method: "POST",
      body: image,
    }),
    invalidatesTags: [{ type: "Product" }],
  }),
});
export const productsApiSlice = apiSlice.injectEndpoints({ endpoints });

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productsApiSlice;
