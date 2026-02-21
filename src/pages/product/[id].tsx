import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Grid, Skeleton } from "@mui/material";
import ProductGallery from "@/components/organisms/Product/ProductGallery";
import ProductInfo from "@/components/organisms/Product/ProductInfo";
import ProductTabs from "@/components/organisms/Product/ProductTabs";
import RelatedProducts from "@/components/organisms/Product/RelatedProducts";

export default function ProductDetailsPage({ productData }: any) {
  if (!productData) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  return (
    <>
      <Head>
        <title>{productData?.title} | Shop Hub</title>
        <meta name="description" content={productData?.description} />
      </Head>

      <Box sx={{ py: 4 }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <ProductGallery images={productData?.images} />
          </Grid>

          <Grid item xs={12} md={7}>
            <ProductInfo product={productData} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <ProductTabs product={productData} />
        </Box>
        {/* <Box sx={{ mt: 6 }}>
          <RelatedProducts products={product.relatedProducts} />
        </Box> */}
      </Box>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const productDataUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_PRODUCT_DETAILS_ENDPOINT}/${query?.id}`;
  const response = await fetch(productDataUrl);
  const productDataResult = await response?.json();
  return {
    props: {
      productData: productDataResult,
    },
  };
}
