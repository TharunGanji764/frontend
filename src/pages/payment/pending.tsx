import Head from "next/head";
import { Box, Typography, Button } from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Link from "next/link";

const PaymentPending = () => {
  return (
    <>
      <Head>
        <title>Payment Pending | Shop Hub</title>
        <meta name="description" content="Your payment is being processed" />
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
          <HourglassTopIcon
            sx={{
              fontSize: 80,
              color: "warning.main",
            }}
          />

          <Typography variant="h4" sx={{ mt: 2 }}>
            Payment Pending ⏳
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Your payment is currently being processed. Please wait or check your
            order status.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Link href="/orders">
              <Button variant="contained" sx={{ mr: 2 }}>
                Check Order Status
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outlined">Go to Home</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default PaymentPending;
