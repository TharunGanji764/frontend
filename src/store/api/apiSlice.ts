import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";
import { updateProfile } from "../slices/userSlice";
import { addCategories } from "../slices/categorySlice";
import { addItemToCart } from "../slices/cartSlice";
import { headers } from "next/headers";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    login: builder.mutation<any, { emailId: string; password: string }>({
      query: (body) => ({
        url: process.env.NEXT_PUBLIC_API_LOGIN_ENDPOINT,
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const payload = {
            name: data?.username,
            email: data?.email,
            phone: "",
            userId: data?.userId,
          };
          dispatch(updateProfile(payload));
        } catch (err) {}
      },
    }),

    updateProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: "/user/profile",
        method: "PUT",
        body,
      }),
    }),

    logout: builder.mutation<any, { userId: string; sessionId: string }>({
      query: (body) => ({
        url: process.env.NEXT_PUBLIC_API_LOGOUT_ENDPOINT,
        method: "POST",
        body,
      }),
    }),

    getCategories: builder.query<any, void>({
      query: () => ({
        url: process.env.NEXT_PUBLIC_API_CATEGORIES_ENDPOINT,
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addCategories(data));
        } catch (err) {}
      },
    }),

    getProducts: builder.mutation<any, { page: number; limit: number }>({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT}?page=${body?.page}&limit=${body?.limit}`,
        method: "GET",
      }),
    }),

    addToCart: builder.mutation<any, { product_id: string; quantity: number }>({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_CART_ENDPOINT}/add-to-cart`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    getCart: builder.query<any, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_CART_ENDPOINT}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    updateCart: builder.mutation<any, { productId: string; action: string }>({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_CART_ENDPOINT}/items?productId=${body?.productId}`,
        method: "PUT",
        body: {
          action: body?.action,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<any, { productId: string }>({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_CART_ENDPOINT}/items?productId=${body?.productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    getAddress: builder.query<any, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_ADDRESS_ENDPOINT}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation<
      any,
      { shippingAddressId: any; headers: any }
    >({
      query: ({ headers, ...body }) => ({
        url: `${process.env.NEXT_PUBLIC_API_CREATE_ORDER_ENDPOINT}`,
        method: "POST",
        headers,
        body,
      }),
    }),
    retryPayment: builder.mutation<any, { orderId: string; headers: any }>({
      query: ({ orderId, headers }) => ({
        url: `${process.env.NEXT_PUBLIC_API_CREATE_ORDER_ENDPOINT}/${orderId}/retry-payment`,
        method: "POST",
        headers,
        body: { orderId },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetCategoriesQuery,
  useGetProductsMutation,
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useGetAddressQuery,
  useCreateOrderMutation,
  useRetryPaymentMutation,
} = apiSlice;
