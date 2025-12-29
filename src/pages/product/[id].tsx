import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Grid, Skeleton } from "@mui/material";
import ProductGallery from "@/components/organisms/Product/ProductGallery";
import ProductInfo from "@/components/organisms/Product/ProductInfo";
import ProductTabs from "@/components/organisms/Product/ProductTabs";
import RelatedProducts from "@/components/organisms/Product/RelatedProducts";
import products from "@/mock-data/product-details";

export default function ProductDetailsPage() {
  const { query } = useRouter();
  const id = Number(query.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  return (
    <>
      <Head>
        <title>{product.title} | Shop Hub</title>
        <meta name="description" content={product.shortDescription} />
      </Head>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Images */}
          <Grid item xs={12} md={6}>
            <ProductGallery images={product.images} />
          </Grid>

          {/* Info */}
          <Grid item xs={12} md={6}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>

        <ProductTabs product={product} />

        <RelatedProducts products={product.relatedProducts} />
      </Box>
    </>
  );
}
