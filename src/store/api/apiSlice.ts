import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";
import { updateProfile } from "../slices/userSlice";
import { addCategories } from "../slices/categorySlice";
import { addItemToCart } from "../slices/cartSlice";
import { addToWishlist, WishlistItem } from "../slices/wishlistSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Cart", "WishList"],
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
    autoCompleteSearch: builder.mutation<any, { query: string }>({
      query: ({ query }) => ({
        url: `${process.env.NEXT_PUBLIC_API_AUTOCOMPLETE_SEARCH_ENDPOINT}?q=${query}`,
        method: "GET",
      }),
    }),
    getWishlist: builder.query<any, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_GETWISHLIST_ENDPOINT}`,
        method: "GET",
      }),
      providesTags: ["WishList"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const payload: WishlistItem[] =
            data?.data?.map((item: any) => ({
              id: item?.product_id,
              image: item?.product_image,
              mrp: item?.product_price,
              price: item?.discounted_price,
              rating: item?.product_rating,
              title: item?.product_name,
            })) || [];
          payload.forEach((wishlistItem) =>
            dispatch(addToWishlist(wishlistItem)),
          );
        } catch (err) {}
      },
    }),
    addToWishlist: builder.mutation<any, { productId: string }>({
      query: ({ productId }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ADDTOWISHLIST_ENDPOINT}`,
        method: "POST",
        body: {
          productId,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const payload: WishlistItem = {
            id: data?.product_id,
            image: data?.product_image,
            mrp: data?.product_price,
            price: data?.discounted_price,
            rating: data?.product_rating,
            title: data?.product_name,
          };
          dispatch(addToWishlist(payload));
        } catch (err) {}
      },
      invalidatesTags: ["WishList"],
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
  useAutoCompleteSearchMutation,
  useAddToWishlistMutation,
  useGetWishlistQuery,
} = apiSlice;
