import { SummaryBox } from "@/pages/cart/styles";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CartSummary({ items }: any) {
  const router = useRouter();
  const subtotal = items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0,
  );
  const delivery = subtotal > 999 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <SummaryBox>
      <Typography variant="h6">Price Details</Typography>
      <Typography>Subtotal: ₹{subtotal}</Typography>
      <Typography>Delivery: ₹{delivery}</Typography>

      <Typography fontWeight={700} sx={{ mt: 1 }}>
        Total: ₹{total}
      </Typography>

      <Link href="/checkout">
        <Button variant="primary" fullWidth disabled={items.length === 0}>
          Proceed to Checkout
        </Button>
      </Link>
    </SummaryBox>
  );
}
