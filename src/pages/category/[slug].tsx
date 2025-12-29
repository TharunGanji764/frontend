import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import products from "@/mock-data/product-details";

export default function CategoryPage() {
  const { query } = useRouter();
  const slug = query.slug as string;

  const filtered = products.filter((p: any) => p.category === slug);

  return (
    <>
      <Head>
        <title>{slug} | Shop Hub</title>
        <meta name="description" content={`Browse ${slug} products`} />
      </Head>

      <Typography variant="h4" sx={{ mb: 3 }}>
        {slug}
      </Typography>

      {filtered.length === 0 ? (
        <Typography>No products found</Typography>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((product: any) => (
            <Grid key={product.id} item xs={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
