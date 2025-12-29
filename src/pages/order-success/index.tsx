import { Box, Typography } from "@mui/material";

export default function OrderSuccess() {
  return (
    <Box textAlign="center" sx={{ mt: 8 }}>
      <Typography variant="h4">Order Placed Successfully 🎉</Typography>
      <Typography sx={{ mt: 2 }}>
        Estimated delivery in 3–5 business days
      </Typography>
    </Box>
  );
}
