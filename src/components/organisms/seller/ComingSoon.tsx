import { Box, Typography } from "@mui/material";
import { ComingSoonContainer } from "./Stylex";

export const ComingSoon = ({ title }: { title: string }) => (
  <ComingSoonContainer>
    <Typography sx={{ fontSize: 52, mb: 2 }}>🚧</Typography>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2">This section is coming soon.</Typography>
  </ComingSoonContainer>
);
