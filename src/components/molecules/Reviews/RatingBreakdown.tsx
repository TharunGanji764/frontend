import { Box, LinearProgress, Typography } from "@mui/material";

export default function RatingBreakdown({ ratings }: any) {
  return (
    <Box sx={{ mb: 3 }}>
      {Object.entries(ratings).map(([k, v]: any) => (
        <Box key={k} sx={{ display: "flex", alignItems: "center" }}>
          <Typography width={40}>{k}★</Typography>
          <LinearProgress value={v} variant="determinate" sx={{ flex: 1 }} />
        </Box>
      ))}
    </Box>
  );
}
