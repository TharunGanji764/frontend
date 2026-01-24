import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";
import { updateProfile } from "../slices/userSlice";
import { addCategories } from "../slices/categorySlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
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

    logout: builder.mutation({
      query: () => ({
        url: process.env.NEXT_PUBLIC_API_LOGOUT_ENDPOINT,
        method: "POST",
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
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetCategoriesQuery } =
  apiSlice;
