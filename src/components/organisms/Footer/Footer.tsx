import { Box, Grid, Typography, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#F3F4F6", mt: 8, pt: 6, pb: 4 }}>
      <Grid container spacing={4} maxWidth="lg" mx="auto">
        <Grid item xs={12} md={3}>
          <Typography variant="h6">Shop Hub</Typography>
          <Typography variant="body2">Your one-stop shop</Typography>
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography variant="subtitle1">Customer Service</Typography>
          <Typography variant="body2">Help Center</Typography>
          <Typography variant="body2">Returns</Typography>
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography variant="subtitle1">Policies</Typography>
          <Typography variant="body2">Privacy Policy</Typography>
          <Typography variant="body2">Terms & Conditions</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Contact</Typography>
          <Typography variant="body2">support@shophub.com</Typography>
          <Typography variant="body2">India</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box textAlign="center">
        <Typography variant="body2">
          © {new Date().getFullYear()} Shop Hub. All prices in INR.
        </Typography>
      </Box>
    </Box>
  );
}
