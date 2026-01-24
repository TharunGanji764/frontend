import { ColumnStack, RowStack } from "@/components/commonStyles/styles";
import { Box, Card, CardContent, styled } from "@mui/material";

export const ProductCardContainer = styled(Card)({
  height: "100%",
  maxWidth: "290px",
  minWidth: "290px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  justifyContent: "space-between",
});

export const CustomCardContent = styled(ColumnStack)({
  padding: "0.625vw",
});

export const ProductInfoBox = styled(RowStack)({
  columnGap: "0.625vw",
  alignItems: "center",
});

export const CartButtons = styled(Box)({
  marginTop: "0.208vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "0.208vw",
  padding: "0vw 0.208vw",
  height: "2.083vw",
});
