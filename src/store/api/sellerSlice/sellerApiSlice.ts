import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQuery";

export const sellerApiSlice = createApi({
  reducerPath: "sellerApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    sellerLogin: builder.mutation<any, { email_id: string; password: string }>({
      query: (body) => ({
        url: process.env.NEXT_PUBLIC_API_SELLER_LOGIN_ENDPOINT,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSellerLoginMutation } = sellerApiSlice;
