import { Grid } from "@mui/material";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import Link from "next/link";

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <Grid container spacing={2}>
      {products.map((p) => (
        <Link href={`/category/${p.slug}`}>
          <Grid item xs={6} md={6} lg={3} key={p.id}>
            <ProductCard product={p} />
          </Grid>
        </Link>
      ))}
    </Grid>
  );
}
