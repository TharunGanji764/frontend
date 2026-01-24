import { Box, Typography, Button } from "@mui/material";

export default function ReviewList({ reviews }: any) {
  return (
    <Box>
      <Button variant="outlined" sx={{ mb: 2 }}>
        Write a Review
      </Button>

      {reviews?.map((review: any) => (
        <Box key={review?.id} sx={{ mb: 2 }}>
          <Typography fontWeight={600}>{review?.user}</Typography>
          <Typography>{review?.comment}</Typography>
        </Box>
      ))}
    </Box>
  );
}
