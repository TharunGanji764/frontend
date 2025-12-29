import { Box, Typography, Button } from "@mui/material";

export default function EmptyWishlist() {
  return (
    <Box textAlign="center" sx={{ mt: 8 }}>
      <Typography variant="h5">Your wishlist is empty</Typography>
      <Typography sx={{ mb: 2 }}>Save items you like for later</Typography>
      <Button variant="contained">Start Shopping</Button>
    </Box>
  );
}
