import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithAuth = async (args: any, api: any, options: any) => {
  let result = await baseQuery(args, api, options);

  if (result?.error && result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: process.env.NEXT_PUBLIC_API_REFRESH_ENDPOINT as string,
        method: "POST",
      },
      api,
      options,
    );
    if (refreshResult?.data) {
      const { accessToken } = refreshResult?.data as any;

      localStorage.setItem("accessToken", accessToken);

      result = await baseQuery(args, api, options);
    } else {
      localStorage.clear();
    }
  }
  return result;
};
