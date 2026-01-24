import Head from "next/head";
import { Box, Typography } from "@mui/material";
import HeroCarousel from "@/components/organisms/Home/HeroCarousel";
import CategorySection from "@/components/organisms/Home/CategorySection";
import ProductSection from "@/components/organisms/Home/ProductSection";
import products from "@/mock-data/product-details";

export default function HomePage({ productsData, categoriesData }: any) {
  const bestSellers = products?.slice(8, 16);
  const newArrivals = [...products]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 8);
  return (
    <>
      <Head>
        <title>Shop Hub - Online Shopping</title>
        <meta name="description" content="Shop Hub home page" />
      </Head>

      <Box sx={{ mt: 2 }}>
        <HeroCarousel />
        <Box sx={{ mt: 3 }}>
          {productsData?.data?.length > 0 && (
            <ProductSection
              title="Featured Products"
              products={productsData?.data}
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
  const productsurl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_PRODUCTS_ENDPOINT}`;
  const categoriesUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_CATEGORIES_ENDPOINT}`;
  const productsresponse = await fetch(productsurl);
  const categoriesresponse = await fetch(categoriesUrl);
  const categoriesresult = await categoriesresponse?.json();
  const productsresult = await productsresponse?.json();

  return {
    props: {
      productsData: productsresult,
      categoriesData: categoriesresult,
    },
  };
}
