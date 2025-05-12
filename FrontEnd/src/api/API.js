import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  reducerPath: "api",
  tagTypes: ["Products", "Users", "Cart"],
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => "/api/products",
      providesTags: ["Products"],
    }),
    fetchUsers: builder.query({
      query: () => "/api/users",
      providesTags: ["Users"],
    }),
    fetchCart: builder.query({
      query: (user_id) => `/api/user_cart/${user_id}`,
      providesTags: ["Cart"],
    }),
    fetchSingleUser: builder.query({
      query: (user_id) => `/api/users/${user_id}`,
      providesTags: ["Users"],
    }),
    fetchSingleProduct: builder.query({
      query: (product_id) => `/api/products/${product_id}`,
      providesTags: ["Products"],
    }),
    addToCart: builder.mutation({
      query: ({ user_id, product_id }) => ({
        url: `/api/user_cart/${user_id}`,
        method: "POST",
        body: { product_id },
      }),
      invalidatesTags: ["Cart"],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/api/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),
    changeQuantity: builder.mutation({
      query: ({ user_id, product_id, quantity }) => ({
        url: `/api/user_cart/${user_id}`,
        method: "PUT",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    editProduct: builder.mutation({
      query: ({ product_id, productData }) => ({
        url: `/api/products/${product_id}`,
        method: "PUT",
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (product_id) => ({
        url: `/api/products/${product_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Cart"],
    }),
    removeFromCart: builder.mutation({
      query: ({ user_id, product_id }) => ({
        url: `/api/user_cart/${user_id}/${product_id}`,
        method: "DELETE",
        body: { product_id },
      }),
      invalidatesTags: ["Cart"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/login",
        method: "POST",
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/api/register",
        method: "POST",
        body: {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          address: userData.address,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    clearCart: builder.mutation({
      query: (user_id) => ({
        url: `/api/user_cart/${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchUsersQuery,
  useFetchCartQuery,
  useFetchSingleUserQuery,
  useFetchSingleProductQuery,
  useAddToCartMutation,
  useChangeQuantityMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useRemoveFromCartMutation,
  useLoginMutation,
  useCreateUserMutation,
  useCreateProductMutation,
  useClearCartMutation,
} = api;
