import transientProps from "@/utils/TransientProps";
import { Box, Paper, styled } from "@mui/material";

export const ProfileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: `${theme?.palette?.background?.default}`,
  minHeight: "100vh",
  padding: "0.625vw",
  marginTop: "1.458vw",
}));

export const SideBar = styled(Paper)({
  width: "12.5vw",
  padding: "0.417vw",
  marginRight: "0.729vw",
  borderRadius: "0.417vw",
});

export const SidebarTabs = styled(
  Box,
  transientProps,
)<{ $isActive: boolean }>(({ $isActive }) => ({
  padding: "0.208vw 0.313vw",
  marginBottom: "0.104vw",
  borderRadius: "0.208vw",
  cursor: "pointer",
  fontWeight: $isActive ? 600 : 400,
  backgroundColor: $isActive ? "rgba(17,24,39,0.05)" : "transparent",
  color: "text.primary",
  "&:hover": {
    backgroundColor: "rgba(17,24,39,0.05)",
  },
}));
