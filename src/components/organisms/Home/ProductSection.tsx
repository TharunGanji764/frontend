import {
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { useState } from "react";
import { ProductsContainer, ProductsSectionContainer } from "./Styles";
import Loader from "@/components/atoms/Loader";

interface Props {
  title: string;
  products: any[];
  getProducts?: (args: { page: number; limit: number }) => void;
  isLoading?: any;
}

export default function ProductSection({
  title,
  products,
  getProducts,
  isLoading,
}: Props) {
  const [page, setPage] = useState(2);
  const limit = 4;
  const [noData, setNoData] = useState(false);

  const handleViewMoreClicked = async () => {
    setPage((page) => page + 1);
    if (getProducts) {
      const response = await getProducts({
        page,
        limit,
      });
      if ((response as any)?.data?.data?.length === 0) {
        setNoData(true);
      }
    }
  };
  return (
    <ProductsSectionContainer>
      <Typography variant="h5">{title}</Typography>
      <ProductsContainer container>
        {products?.map((p) => (
          <Grid item key={p?.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
        {isLoading &&
          Array?.from({ length: limit })?.map((_, i) => (
            <Grid item key={`skeleton-${i}`}>
              <Skeleton
                variant="rectangular"
                width={280}
                height={360}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
      </ProductsContainer>
      {!noData && (
        <Button
          size="small"
          sx={{ margin: "0vw auto" }}
          onClick={handleViewMoreClicked}
          variant="link"
        >
          View More
        </Button>
      )}
    </ProductsSectionContainer>
  );
}
