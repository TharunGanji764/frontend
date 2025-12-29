import { Box, Paper, Typography } from "@mui/material";

export default function AuthLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 420 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
}
