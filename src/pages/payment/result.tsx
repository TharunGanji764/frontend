import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const PaymentResult = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { redirect_status } = router.query;

    if (redirect_status === "succeeded") {
      router.replace("/payment/success");
    } else if (redirect_status === "processing") {
      router.replace("/payment/pending");
    } else {
      router.replace("/payment/failed");
    }
  }, [router]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography>Processing payment...</Typography>
    </Box>
  );
};

export default PaymentResult;
