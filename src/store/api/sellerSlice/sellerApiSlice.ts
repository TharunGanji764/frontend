import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQuery";
import {
  setAttributes,
  setProductId,
  setVariants,
  updateBasicInfo,
} from "@/store/slices/seller/productWizardSlice";
import { groupAttributes } from "@/hooks/useProductWizardSelector";

export const sellerApiSlice = createApi({
  reducerPath: "sellerApi",
  baseQuery: baseQueryWithAuth("seller"),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getSellerProducts: builder.query<any, void>({
      query: () => ({
        url: process.env.NEXT_PUBLIC_SELLER_PRDUCTS_ENDPOINT,
        method: "GET",
      }),
      providesTags: ["products"],

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const {
            brand,
            category,
            description,
            full_description,
            id,
            title,
            variants,
          } = data?.data?.[0];
          dispatch(setProductId(id));
          dispatch(
            updateBasicInfo({
              brand,
              category,
              description,
              full_description,
              title,
            }),
          );
          dispatch(setVariants(variants));
          dispatch(
            setAttributes(
              groupAttributes(
                variants?.flatMap((variant: any) => variant?.attributes),
              ),
            ),
          );
        } catch (err) {
          console.error("Logout failed to clear store:", err);
        }
      },
    }),
    createVariants: builder.mutation<any, { productId: any; data: any }>({
      query: ({ productId, data }: any) => ({
        url: `${process.env.NEXT_PUBLIC_SELLER_CREATE_PRODUCT_VARIANT}/${productId}/variants`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateVariants: builder.mutation<any, { productId: any; data: any }>({
      query: ({ productId, data }: any) => ({
        url: `${process.env.NEXT_PUBLIC_SELLER_UPDATE_PRODUCT_VARIANT}/${productId}/variants`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteAttributes: builder.mutation<any, { productId: any; data: any }>({
      query: ({ productId, data }: any) => ({
        url: `${process.env.NEXT_PUBLIC_SELLER_DELETE_PRODUCT_ATTRIBUTES}/${productId}/attributes`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetSellerProductsQuery,
  useCreateVariantsMutation,
  useDeleteAttributesMutation,
  useUpdateVariantsMutation,
} = sellerApiSlice;
