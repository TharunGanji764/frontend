import transientProps from "@/utils/TransientProps";
import {
  Box,
  Paper,
  Stack,
  StepConnector,
  StepLabel,
  styled,
  Typography,
} from "@mui/material";

export const LoaderContainer = styled(
  Box,
  transientProps,
)<{ $isComponentLevel: boolean }>(({ $isComponentLevel }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: $isComponentLevel ? "80vh" : "100vh",
  background: $isComponentLevel ? "transparent" : "rgba(255,255,255,0.5)",
  backdropFilter: $isComponentLevel ? "none" : "blur(1px)",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  filter: "grayscale(10%)",
}));

export const LoaderBox = styled(
  Box,
  transientProps,
)<{ $filltext: any }>(({ $filltext }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  position: "relative",
  color: "transparent",
  textTransform: "lowercase",
  "&::after": {
    content: '"ShopHub"',
    position: "absolute",
    left: 0,
    top: 0,
    color: "#1a1a1a",
    width: 0,
    overflow: "hidden",
    borderRight: "2px solid #1a1a1a",
    animation: `${$filltext} 2s infinite ease-in-out`,
    whiteSpace: "nowrap",
    textTransform: "none",
    letterSpacing: "-0.07em",
  },
}));

export const TextFadeOut = styled(
  Typography,
  transientProps,
)<{ $fadeOut: any }>(({ $fadeOut }) => ({
  marginTop: "10px",
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "0.3em",
  color: "#7a7a7a",
  opacity: 0,
  animation: `${$fadeOut} 2s infinite ease-in-out`,
}));

export const SellerRowStack = styled(
  Stack,
  transientProps,
)<{ $color: string }>(({ $color }) => ({
  flexDirection: "row",
  alignItems: "center",
  color: $color,
  gap: "8px",
}));

export const SellerStatsContainer = styled(Paper)({
  padding: "12px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  borderRadius: "14px",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    transform: "translateY(-2px)",
  },
});

export const SellerStatsIconBox = styled(
  Box,
  transientProps,
)<{
  $mainColor: string;
  $alpha: any;
}>(({ $mainColor, $alpha }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: $alpha($mainColor, 0.1),
  color: $mainColor,
  width: 54,
  height: 54,
  borderRadius: "14px",
  flexShrink: 0,
}));

export const SellerStatsTitle = styled(Typography)({
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 1,
  color: "text.secondary",
  display: "block",
  marginBottom: "4px",
});

export const SellerStatsDescription = styled(Typography)({
  color: "text.secondary",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontWeight: 500,
});

export const SellerStatsWaterMarkIcon = styled(Box)({
  position: "absolute",
  right: "-4px",
  bottom: "-1px",
  opacity: 0.03,
  transform: "rotate(-15deg)",
  pointerEvents: "none",
  "& svg": { fontSize: "68px" },
});

export const ColorlibConnector = styled(
  StepConnector,
  transientProps,
)<{ $stepConnectorClasses: any }>(({ theme, $stepConnectorClasses }) => ({
  [`&.${$stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${$stepConnectorClasses.active}`]: {
    [`& .${$stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${$stepConnectorClasses.completed}`]: {
    [`& .${$stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.success.main,
    },
  },
  [`& .${$stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.divider,
    borderRadius: 1,
    transition: "background-color 0.3s ease",
  },
}));

export const StepIconRoot = styled(
  Box,
  transientProps,
)<{
  $active?: boolean;
  $completed?: boolean;
  $alpha: any;
}>(({ theme, $active, $completed, $alpha }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: "44px",
  height: "44px",
  display: "flex",
  borderRadius: "12px",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s ease",
  ...($active && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 4px 10px 0 ${$alpha(theme.palette.primary.main, 0.4)}`,
    transform: "scale(1.1)",
  }),
  ...($completed && {
    backgroundColor: theme.palette.success.main,
  }),
}));

export const StepperLabel = styled(
  StepLabel,
  transientProps,
)<{ $currentStep: any; $index: number }>(({ $currentStep, $index }) => ({
  mt: 1,
  fontSize: "0.75rem",
  fontWeight: $currentStep === $index ? 700 : 500,
  color: $currentStep === $index ? "text.primary" : "text.secondary",
  textTransform: "uppercase",
  letterSpacing: 0.5,
}));
