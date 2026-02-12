import Head from "next/head";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
  Divider,
  Container,
  IconButton,
} from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

import AddressStep from "@/components/organisms/Checkout/AddressStep";
import PaymentStep from "@/components/organisms/Checkout/PaymentStep";
import ReviewStep from "@/components/organisms/Checkout/ReviewStep";
import { useCreateOrderMutation, useGetCartQuery } from "@/store/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { hideLoader, showLoader } from "@/store/slices/loaderSlice";

const steps = ["Shipping", "Review"];

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cartItems, isLoading } = useGetCartQuery();

  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState<any>(null);
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();

  const idempotencyKey = useRef(uuidv4());

  const subtotal = useMemo(() => {
    return (
      cartItems?.items?.reduce(
        (sum: number, i: any) => sum + i.price * i.quantity,
        0,
      ) || 0
    );
  }, [cartItems]);

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleCreateOrder = async () => {
    dispatch(showLoader());
    const res = await createOrder({
      shippingAddressId: address?.id,
      headers: {
        "Idempotency-Key": idempotencyKey.current,
      },
    });
    if (res?.data) {
      await router.push(`/payment?orderId=${res?.data?.orderNumber}`);
      dispatch(hideLoader());
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Head>
        <title>Checkout | Shop Hub</title>
      </Head>

      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        {activeStep > 0 && (
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBackIosNew fontSize="small" />
          </IconButton>
        )}
        <Typography variant="h4" fontWeight="700">
          Checkout
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            variant="outlined"
            sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}
          >
            <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
              {steps?.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <AddressStep
                onNext={(addr: any) => {
                  setAddress(addr);
                  setActiveStep(1);
                }}
              />
            )}
            {activeStep === 1 && (
              <ReviewStep
                cartItems={cartItems?.items}
                subtotal={subtotal}
                address={address}
                onPlaceOrder={handleCreateOrder}
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ position: "sticky", top: 100 }}>
            <Paper
              variant="outlined"
              sx={{ p: 3, borderRadius: 2, bgcolor: "#fafafa" }}
            >
              <Typography variant="h6" gutterBottom fontWeight="600">
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography fontWeight="500">
                    ₹{subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography color="success.main" fontWeight="500">
                    Free
                  </Typography>
                </Box>
                {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography color="text.secondary">Estimated Tax</Typography>
                  <Typography fontWeight="500">
                    ₹{(subtotal * 0.08).toFixed(2)}
                  </Typography>
                </Box> */}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary.main">
                  ₹{(subtotal * 1.08).toFixed(2)}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                By placing your order, you agree to Shop Hub's privacy notice
                and conditions of use.
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
