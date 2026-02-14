import Head from "next/head";
import { Box, Typography, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { useRetryPaymentMutation } from "@/store/api/apiSlice";
import { useRouter } from "next/router";

const PaymentFailed = () => {
  const idempotencyKey = useRef(uuidv4());
  const [retryPayment] = useRetryPaymentMutation();
  const router = useRouter();
  const { orderId } = router?.query;

  const handleRetryPayment = async () => {
    const res = await retryPayment({
      orderId: orderId as string,
      headers: {
        "Idempotency-Key": idempotencyKey.current,
      },
    });
    if (res?.data?.message) {
      router.push(`/payment?orderId=${orderId}`);
    }
  };

  return (
    <>
      <Head>
        <title>Payment Failed | Shop Hub</title>
        <meta
          name="description"
          content="Your payment could not be processed"
        />
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
          <CancelOutlinedIcon
            sx={{
              fontSize: 80,
              color: "error.main",
            }}
          />

          <Typography variant="h4" sx={{ mt: 2 }}>
            Payment Failed ❌
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Something went wrong while processing your payment. Please try
            again.
          </Typography>

          <Box sx={{ mt: 3 }}>
            {/* <Link href="/checkout"> */}
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={handleRetryPayment}
            >
              Retry Payment
            </Button>
            {/* </Link> */}

            <Link href="/cart">
              <Button variant="outlined">Back to Cart</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PaymentFailed;
