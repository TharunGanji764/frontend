import Head from "next/head";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/router";
import { addOrder } from "@/store/slices/orderSlice";

const steps = ["Address", "Payment", "Review", "Place Order"];

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const [activeStep, setActiveStep] = useState(0);
  const [payment, setPayment] = useState("");

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const placeOrder = () => {
    dispatch(
      addOrder({
        id: Date.now().toString(),
        items: cartItems,
        total: subtotal,
        paymentMethod: payment,
        status: "Placed",
        date: new Date().toISOString(),
      })
    );
    dispatch(clearCart());
    router.push("/orders");
  };

  return (
    <>
      <Head>
        <title>Checkout | Shop Hub</title>
      </Head>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box>
          <Typography>Address form (reuse profile later)</Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => setActiveStep(1)}
          >
            Continue
          </Button>
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <Typography>Select Payment</Typography>

          <Button
            variant={payment === "COD" ? "contained" : "outlined"}
            onClick={() => setPayment("COD")}
            sx={{ mr: 1 }}
          >
            COD
          </Button>

          <Button
            variant={payment === "UPI" ? "contained" : "outlined"}
            onClick={() => setPayment("UPI")}
          >
            UPI
          </Button>

          <Button
            sx={{ mt: 2 }}
            variant="contained"
            disabled={!payment}
            onClick={() => setActiveStep(2)}
          >
            Continue
          </Button>
        </Box>
      )}

      {activeStep === 2 && (
        <Box>
          <Typography>Order Total: ₹{subtotal}</Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => setActiveStep(3)}
          >
            Place Order
          </Button>
        </Box>
      )}

      {activeStep === 3 && (
        <Box>
          <Button variant="contained" fullWidth onClick={placeOrder}>
            Confirm Order
          </Button>
        </Box>
      )}
    </>
  );
}
