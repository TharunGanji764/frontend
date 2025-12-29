import { Box, Typography, Button } from "@mui/material";

export default function ReviewList({ reviews }: any) {
  return (
    <Box>
      <Button variant="outlined" sx={{ mb: 2 }}>
        Write a Review
      </Button>

      {reviews.map((r: any) => (
        <Box key={r.id} sx={{ mb: 2 }}>
          <Typography fontWeight={600}>{r.user}</Typography>
          <Typography>{r.comment}</Typography>
        </Box>
      ))}
    </Box>
  );
}
