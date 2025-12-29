import { Box, Typography } from "@mui/material";

export default function AnnouncementBar() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
        textAlign: "center",
        py: 0.5,
        fontSize: "0.8rem",
      }}
    >
      <Typography variant="body2">
        Free delivery on orders above ₹999
      </Typography>
    </Box>
  );
}
