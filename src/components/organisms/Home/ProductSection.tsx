import { Grid, Typography, Box, Button } from "@mui/material";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";

interface Props {
  title: string;
  products: any[];
}

export default function ProductSection({ title, products }: Props) {
  return (
    <Box sx={{ mt: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">{title}</Typography>
        <Button size="small">View All</Button>
      </Box>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid item xs={6} md={3} lg={2} key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
