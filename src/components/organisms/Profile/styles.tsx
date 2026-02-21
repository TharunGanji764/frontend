import transientProps from "@/utils/TransientProps";
import { Box, Paper, Typography, styled } from "@mui/material";

export const ProfileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  padding: "0.625vw",
  marginTop: "1.458vw",
  gap: "0.729vw",
}));

export const SideBar = styled(Paper)(({ theme }) => ({
  width: "12.5vw",
  minWidth: "180px",
  padding: "0.75rem",
  borderRadius: "0.75rem",
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  position: "sticky",
  top: "100px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
}));

export const SidebarLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
  padding: "0 0.5rem",
  marginBottom: "0.3rem",
  display: "block",
}));

export const SidebarTab = styled(
  Box,
  transientProps,
)<{ $isActive: boolean; $isDanger: boolean }>(
  ({ theme, $isActive, $isDanger }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    padding: "0.53rem 0.6rem",
    marginBottom: "0.15rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: $isDanger
      ? theme.palette.error.main
      : $isActive
        ? theme.palette.text.primary
        : theme.palette.text.secondary,
    backgroundColor: $isActive ? "rgba(17,24,39,0.07)" : "transparent",
    fontWeight: $isActive ? 600 : 400,
    transition: "background-color 0.15s, color 0.15s",
    position: "relative",

    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: "3px",
      height: $isActive ? "60%" : "0%",
      backgroundColor: theme.palette.text.primary,
      borderRadius: "0 4px 4px 0",
      transition: "height 0.2s",
    },

    "&:hover": {
      backgroundColor: $isDanger
        ? "rgba(220,38,18,0.06)"
        : "rgba(17,24,39,0.05)",
      color: $isDanger ? theme.palette.error.main : theme.palette.text.primary,
    },
  }),
);

export const SidebarBadge = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: "#fff",
  fontSize: "0.67rem",
  fontWeight: 700,
  padding: "1px 7px",
  borderRadius: "20px",
  minWidth: "18px",
  textAlign: "center",
  lineHeight: "1.7",
  flexShrink: 0,
}));

export const SidebarDivider = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  margin: "0.6rem 0.25rem",
}));

export const MainContent = styled(Box)({
  flex: 1,
  maxWidth: 900,
  display: "flex",
  flexDirection: "column",
});

export const ProfileHeroCard = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.75rem",
  overflow: "hidden",
  marginBottom: "1.1rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
}));

export const ProfileBanner = styled(Box)(({ theme }) => ({
  height: "86px",
  backgroundColor: theme.palette.text.primary,
  position: "relative",
  overflow: "hidden",
  // Subtle diagonal stripe texture
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "repeating-linear-gradient(-45deg, transparent, transparent 22px, rgba(255,255,255,0.03) 22px, rgba(255,255,255,0.03) 44px)",
  },
}));

export const ProfileHeroBody = styled(Box)({
  padding: "0 1.5rem 1.4rem",
  display: "flex",
  alignItems: "flex-end",
  gap: "1.1rem",
});

export const AvatarEditWrapper = styled(Box)({
  position: "relative",
  marginTop: "-36px",
  flexShrink: 0,
});

export const AvatarEditButton = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "1px",
  right: "1px",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: theme.palette.background.paper,
  border: `1.5px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  transition: "border-color 0.15s",
  color: theme.palette.text.primary,
  "&:hover": {
    borderColor: theme.palette.text.primary,
  },
}));

export const StatCard = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.75rem",
  padding: "1.15rem 1.25rem",
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
  transition: "box-shadow 0.15s",
  "&:hover": {
    boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
  },
}));

const variantStyles = {
  default: {
    background: "rgba(17,24,39,0.07)",
    color: "#111827",
  },
  success: {
    background: "rgba(22,163,74,0.10)",
    color: "#16A34A",
  },
  warning: {
    background: "rgba(245,158,11,0.10)",
    color: "#F59E0B",
  },
};

export const StatIconWrapper = styled(
  Box,
  transientProps,
)<{ variant: "default" | "success" | "warning" }>(({ variant }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  ...variantStyles[variant],
}));

export const SectionCard = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.75rem",
  marginBottom: "1.1rem",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 1.5rem",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const InfoGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1.2rem 2rem",
});

export const InfoField = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.28rem",

  "& .field-label": {
    fontSize: "0.7rem",
    fontWeight: 500,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#6B7280",
  },
  "& .field-value": {
    fontSize: "0.9rem",
    fontWeight: 400,
    color: "#111827",
  },
});

export const StatusChip = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  padding: "0.22rem 0.6rem",
  borderRadius: "6px",
  background: "rgba(22,163,74,0.10)",
  color: "#16A34A",
  fontSize: "0.72rem",
  fontWeight: 600,
  width: "fit-content",

  // Green dot
  "&::before": {
    content: '""',
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#16A34A",
    flexShrink: 0,
  },
});

export const NotifRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 0",
});

export const NotifIcon = styled(Box)(({ theme }) => ({
  width: "34px",
  height: "34px",
  borderRadius: "8px",
  backgroundColor: theme.palette.action.hover,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

export const OrdersRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  padding: "1rem 0",
});

export const OrdersIconBox = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: "rgba(17,24,39,0.07)",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}));

export const OrdersStatusChip = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  padding: "0.2rem 0.55rem",
  borderRadius: "6px",
  fontSize: "0.72rem",
  fontWeight: 600,
  lineHeight: 1.5,
  whiteSpace: "nowrap",
});

export const OrdersEmptyState = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 1rem",
  textAlign: "center",
});

export const ProfileSectionCard = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.75rem",
  marginBottom: "1.1rem",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
}));

export const ProfileSectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 1.5rem",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));


export const AddressCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  padding: "1rem 1.25rem",
  borderRadius: "0.75rem",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  transition: "box-shadow 0.15s",
  "&:hover": {
    boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
  },
}));

export const AddressIconBox = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: "rgba(17,24,39,0.07)",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}));

export const AddressEmptyState = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 1rem",
  textAlign: "center",
});