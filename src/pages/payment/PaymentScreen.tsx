import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GoogleIcon from "@mui/icons-material/Google";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

type Props = {
  orderId: string;
  amount: number;
};

const PaymentScreen = ({ orderId, amount }: Props) => {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?orderId=${orderId}`,
      },
    });

    setLoading(false);

    if (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8, px: 2 }}
    >
      <Box sx={{ maxWidth: 500, mx: "auto" }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
          <IconButton size="small">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6">Checkout</Typography>
        </Stack>

        <Card sx={{ p: 4 }}>
          <Stack spacing={0.5} sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Order Number: {orderId}
            </Typography>
            <Typography variant="h3" color="primary">
              ₹{amount}
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4, borderStyle: "dashed" }} />

          <Typography variant="h5" sx={{ mb: 3 }}>
            Select Payment Method
          </Typography>

          <RadioGroup
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <Stack spacing={2}>
              <PaymentOptionCard
                value="card"
                label="Credit / Debit Card"
                icon={<CreditCardIcon color="primary" />}
                active={method === "card"}
              />

              <PaymentOptionCard
                value="gpay"
                label="Google Pay / UPI"
                icon={<GoogleIcon color="primary" />}
                active={method === "gpay"}
              />

              <PaymentOptionCard
                value="bank"
                label="Net Banking"
                icon={<AccountBalanceIcon color="primary" />}
                active={method === "bank"}
              />
            </Stack>
          </RadioGroup>

          <Divider sx={{ my: 4, borderStyle: "dashed" }} />

          <PaymentElement options={{ layout: "tabs" }} />

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 5, py: 1.5 }}
            disabled={!stripe || loading}
            onClick={handlePayment}
          >
            {loading ? "Processing..." : "Complete Payment"}
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 2 }}
          >
            Payments are secure and encrypted.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

const PaymentOptionCard = ({ value, label, icon, active }: any) => (
  <Box
    sx={{
      border: "1px solid",
      borderColor: active ? "primary.main" : "divider",
      borderRadius: 3,
      px: 2,
      py: 1,
      transition: "0.2s",
      bgcolor: active ? "rgba(17, 24, 39, 0.02)" : "transparent",
      "&:hover": { bgcolor: "rgba(17, 24, 39, 0.04)" },
    }}
  >
    <FormControlLabel
      value={value}
      control={<Radio size="small" />}
      label={
        <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 1 }}>
          {icon}
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
        </Stack>
      }
      sx={{ width: "100%", m: 0 }}
    />
  </Box>
);

export default PaymentScreen;
