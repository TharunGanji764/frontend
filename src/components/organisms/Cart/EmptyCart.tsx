import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function EmptyCart() {
  const router = useRouter();
  return (
    <Box textAlign="center" sx={{ mt: 8 }}>
      <Typography variant="h5">Your cart is empty</Typography>
      <Typography sx={{ mb: 2 }}>Add items to get started</Typography>
      <Button variant="contained" onClick={() => router.push("/")}>
        Continue Shopping
      </Button>
    </Box>
  );
}
