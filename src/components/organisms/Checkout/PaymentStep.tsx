import { Box, Button, Typography } from "@mui/material";

export default function PaymentStep({ paymentMethod, onSelect, onNext }: any) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Select Payment Method
      </Typography>

      <Button
        sx={{ mr: 2 }}
        variant={paymentMethod === "UPI" ? "contained" : "outlined"}
        onClick={() => onSelect("UPI")}
      >
        UPI
      </Button>

      <Button
        variant={paymentMethod === "COD" ? "contained" : "outlined"}
        onClick={() => onSelect("COD")}
      >
        Cash on Delivery
      </Button>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" disabled={!paymentMethod} onClick={onNext}>
          Continue
        </Button>
      </Box>
    </Box>
  );
}
