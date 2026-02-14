import Head from "next/head";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <>
      <Head>
        <title>Payment Successful | Shop Hub</title>
        <meta name="description" content="Your payment was successful" />
      </Head>

      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 80,
              color: "success.main",
            }}
          />

          <Typography variant="h4" sx={{ mt: 2 }}>
            Payment Successful 🎉
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Your order has been placed successfully.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Link href="/orders">
              <Button variant="contained" sx={{ mr: 2 }}>
                View Orders
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outlined">Continue Shopping</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PaymentSuccess;
