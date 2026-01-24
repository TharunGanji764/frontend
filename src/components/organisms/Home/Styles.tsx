import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";

export const ProductsSectionContainer = styled(Box)({
  marginTop: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  rowGap: "12px",
});

export const ProductsContainer = styled(Grid)({
  columnGap: "14px",
  flexWrap: "wrap",
  rowGap: "14px",
});
