import Head from "next/head";
import { Box, Typography } from "@mui/material";
import HeroCarousel from "@/components/organisms/Home/HeroCarousel";
import CategorySection from "@/components/organisms/Home/CategorySection";
import ProductSection from "@/components/organisms/Home/ProductSection";
import products from "@/mock-data/product-details";
import { useGetProductsMutation } from "@/store/api/apiSlice";
import { useEffect, useState } from "react";

export default function HomePage({ productsData }: any) {
  const bestSellers = products?.slice(8, 16);
  const newArrivals = [...products]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 8);

  const [productsdata, setProducts] = useState<any[]>([]);

  const [getProducts, { data, isLoading }] = useGetProductsMutation();

  useEffect(() => {
    if (data?.data) {
      setProducts((prev: any) => [...prev, ...data?.data]);
    }
  }, [data]);

  useEffect(() => {
    if (productsData?.data) {
      setProducts(productsData.data);
    }
  }, [productsData]);
  return (
    <>
      <Head>
        <title>Shop Hub - Online Shopping</title>
        <meta name="description" content="Shop Hub home page" />
      </Head>

      <Box sx={{ mt: 2 }}>
        <HeroCarousel />
        <Box sx={{ mt: 3 }}>
          {productsdata?.length > 0 && (
            <ProductSection
              title="Featured Products"
              products={productsdata}
              getProducts={getProducts}
              isLoading={isLoading}
            />
          )}
          {bestSellers.length > 0 && (
            <ProductSection title="Best Sellers" products={bestSellers} />
          )}

          {newArrivals.length > 0 && (
            <ProductSection title="New Arrivals" products={newArrivals} />
          )}

          {products.length === 0 && (
            <Typography>No products available</Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const productsurl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT}?page=1&limit=6`;

  try {
    const productsresponse = await fetch(productsurl);
    if (!productsresponse.ok) {
      return {
        props: {
          productsData: [],
          hasError: true,
        },
      };
    }
    const productsresult = await productsresponse.json();
    return {
      props: {
        productsData: productsresult ?? [],
        hasError: false,
      },
    };
  } catch (error) {
    return {
      props: {
        productsData: [],
        hasError: true,
      },
    };
  }
}
