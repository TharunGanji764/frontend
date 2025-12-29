import { Box, Typography, Button, Dialog } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearCart } from "@/store/slices/cartSlice";
import { clearCheckout } from "@/store/slices/checkoutSlice";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ReviewStep() {
  const { address, paymentMethod } = useSelector(
    (state: RootState) => state.checkout
  );
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const placeOrder = () => {
    dispatch(clearCart());
    dispatch(clearCheckout());
    router.push("/order-success");
  };

  return (
    <Box>
      <Typography variant="h6">Address</Typography>
      <Typography>{address?.fullName}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Payment
      </Typography>
      <Typography>{paymentMethod}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Items
      </Typography>
      {cart.map((i) => (
        <Typography key={i.id}>
          {i.title} × {i.quantity}
        </Typography>
      ))}

      <Button variant="contained" sx={{ mt: 3 }} onClick={() => setOpen(true)}>
        Place Order
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 3 }}>
          <Typography>Confirm order?</Typography>
          <Button onClick={placeOrder}>Yes</Button>
        </Box>
      </Dialog>
    </Box>
  );
}
