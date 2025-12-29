import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CartSummary({ items }: any) {
  const router = useRouter();
  const subtotal = items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  );
  const discount = items.reduce(
    (sum: number, i: any) => sum + (i.mrp - i.price) * i.quantity,
    0
  );
  const delivery = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + delivery + tax;

  return (
    <Box sx={{ position: "sticky", top: 100 }}>
      <Typography variant="h6">Price Details</Typography>

      <Typography>Subtotal: ₹{subtotal}</Typography>
      <Typography>Discount: -₹{discount}</Typography>
      <Typography>Delivery: ₹{delivery}</Typography>
      <Typography>Tax (GST): ₹{tax}</Typography>

      <Typography fontWeight={700} sx={{ mt: 1 }}>
        Total: ₹{total}
      </Typography>

      <Typography color="success.main">You saved ₹{discount}</Typography>

      <Link href="/checkout">
        <Button variant="contained" fullWidth disabled={items.length === 0}>
          Proceed to Checkout
        </Button>
      </Link>
    </Box>
  );
}
