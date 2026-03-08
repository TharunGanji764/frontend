import { Stack, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const SellerHeader = ({ title, subtitle, action }: Props) => (
  <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
    <Box>
      <Typography variant="h5">{title}</Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
    {action}
  </Stack>
);
