import { ColumnStack } from "@/components/commonStyles/styles";
import { AppBar, Badge, Box, Paper, styled } from "@mui/material";
import Link from "next/link";

export const HeaderBox = styled(AppBar)({
  position: "sticky",
  color: "inherit",
  backgroundColor: "#FFFFFF",
  padding: "8px 0px",
});

export const Logo = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

export const SearchInputBox = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F3F4F6",
  padding: "4px 16px",
  borderRadius: "50px",
  position: "relative",
});

export const CartBadge = styled(Badge)({
  padding: "0px",
  color: "primary",
  backgroundColor: "red",
});

export const MobileMenu = styled(Box)({
  display: "none",
  "@media (min-width:640px)": {
    display: "block",
  },
});

export const ResultContainer = styled(Paper)({
  position: "absolute",
  top: "120%",
  left: 0,
  right: 0,
  zIndex: 20,
  maxHeight: 350,
  overflowY: "auto",
  borderRadius: "28px",
  minHeight: "320px",
  display: "flex",
  flexDirection: "column",
});

export const LoaderContainer = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const NoResultsBox = styled(ColumnStack)({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});
