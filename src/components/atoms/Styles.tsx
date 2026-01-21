import transientProps from "@/utils/TransientProps";
import { Box, styled, Typography } from "@mui/material";

export const LoaderContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "rgba(255, 255, 255, 0.5)", 
    backdropFilter: "blur(1px)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    filter: "grayscale(10%)",
});

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
