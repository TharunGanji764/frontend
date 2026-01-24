import { Grid, Typography, Box, Button } from "@mui/material";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { useState } from "react";
import { ProductsContainer, ProductsSectionContainer } from "./Styles";

interface Props {
  title: string;
  products: any[];
}

export default function ProductSection({ title, products }: Props) {
  const [showMaxCards, setShowMaxCards] = useState<number>(8);

  const handleViewMoreClicked = () => {
    setShowMaxCards((prev) => prev + 4);
  };
  return (
    <ProductsSectionContainer>
      <Typography variant="h5">{title}</Typography>
      <ProductsContainer container>
        {products?.slice(0, showMaxCards)?.map((p) => (
          <Grid item key={p?.id} >
            <ProductCard product={p} />
          </Grid>
        ))}
      </ProductsContainer>
      <Button
        size="small"
        sx={{ margin: "0vw auto" }}
        onClick={handleViewMoreClicked}
      >
        View More
      </Button>
    </ProductsSectionContainer>
  );
}
