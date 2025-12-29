import { Grid, Typography } from "@mui/material";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";

export default function RelatedProducts({ products }: any) {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        Related Products
      </Typography>
      <Grid container spacing={2}>
        {products?.map((p: any) => (
          <Grid item xs={6} md={3} key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
