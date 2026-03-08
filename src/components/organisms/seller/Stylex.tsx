import transientProps from "@/utils/TransientProps";
import {
  Avatar,
  Box,
  IconButton,
  ListItemButton,
  Paper,
  Stack,
  styled,
  TableCell,
} from "@mui/material";

export const ComingSoonContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  textAlign: "center",
});

export const ProductListContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  rowGap: "22px",
});

export const ProductListBox = styled(Paper)({
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid",
  borderColor: "divider",
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
});

export const ProductListBoxHeader = styled(
  Box,
  transientProps,
)<{ $alpha: any }>(({ $alpha, theme }) => ({
  padding: "12px",
  bgcolor: $alpha(theme?.palette?.primary?.main, 0.01),
}));

export const ProductListStack = styled(Stack)({
  flexDirection: "row",
  spacing: "8px",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ProductListTableCell = styled(TableCell)({
  fontWeight: 700,
});

export const ProductListStockStack = styled(Stack)({
  flexDirection: "row",
  spacing: "4px",
  justifyContent: "flex-end",
  alignItems: "center",
  columnGap: "12px",
});

export const ProductListIconButton = styled(IconButton)({
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "8px",
});

export const SellerSideBarContainer = styled(
  Box,
  transientProps,
)<{ $width: number }>(({ $width, theme }) => ({
  width: $width,
  flexShrink: 0,
  backgroundColor: theme?.palette?.primary?.main,
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  transition: "width 400ms ease",
  overflow: "hidden",
}));

export const SideBarBox = styled(
  Box,
  transientProps,
)<{ $collapsed: boolean }>(({ $collapsed }) => ({
  padding: $collapsed ? "0px 10px" : "0px 10px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  minHeight: "64px",
}));

export const SideBarAvatar = styled(Avatar)({
  backgroundColor: "rgba(255,255,255,0.1)",
  width: "34px",
  height: "34px",
  fontSize: "16px",
  fontWeight: 700,
});

export const SideBarListItemButton = styled(
  ListItemButton,
  transientProps,
)<{ $collapsed: boolean }>(({ $collapsed }) => ({
  minHeight: "42px",
  padding: $collapsed ? "0px" : "0px 20px",
  justifyContent: $collapsed ? "center" : "flex-start",
  margin: "4px 0px",
  marginBottom: "4px",
}));
