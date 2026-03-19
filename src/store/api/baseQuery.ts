import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQueryWithAuth = (prefix: string | undefined = undefined) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: prefix
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${prefix}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  return async (args: any, api: any, options: any) => {
    let result = await baseQuery(args, api, options);
    const role = JSON.parse(
      global?.window?.localStorage?.getItem("userData") || "{}",
    )?.role;
    if (
      result?.error &&
      (result.error.status === 401 || result.error.status === 400)
    ) {
      const refreshResult: any = await baseQuery(
        {
          url: process.env.NEXT_PUBLIC_API_REFRESH_ENDPOINT as string,
          method: "POST",
        },
        api,
        options,
      );

      if (refreshResult?.data?.data) {
        const { accessToken } = refreshResult?.data?.data;
        localStorage.setItem("accessToken", accessToken);
        global.window.location.href = role === "SELLER" ? "/seller" : "/";
        result = await baseQuery(args, api, options);
      } else {
        localStorage.clear();
      }
    }
    return result;
  };
};
