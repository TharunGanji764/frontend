import { Box, styled } from "@mui/material";

export const CartItemBox = styled(Box)({
  display: "flex",
  gap: "0.417vw",
  marginBottom: "0.417vw",
  borderBottom: "1px solid #eee",
  padding: "0.417vw",
  alignItems: "center",
  backgroundColor: "#ffffff",
  borderRadius: "0.833vw",
  boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
  position: "relative",
});

export const SummaryBox = styled(Box)({
  border: "1px solid #eee",
  position: "sticky",
  top: 24,
  padding: "0.625vw",
  backgroundColor: "#ffffff",
  borderRadius: "0.833vw",
  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.625vw",
});

export const CartContainer = styled(Box)({
  backgroundColor: "#f5f5f7",
  minHeight: "100vh",
  padding: "0.729vw 0vw ",
  "@media (max-width:640px)": {
    padding: "0vw 0.417vw",
  },
  "@media(max-width:14400)": {
    padding: "0vw 1.146vw",
  },
});

export const ButtonsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "0.417vw",
});

export const ButtonBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "1px solid #e0e0e0",
  borderRadius: "0.417vw",
  marginRight: "0.417vw",
});

export const InfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "0.625vw",
  marginBottom: "0.208vw",
});
