import { AppBar, Badge, Box, styled } from "@mui/material";
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
