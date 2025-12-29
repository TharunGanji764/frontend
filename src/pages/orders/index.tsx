import Head from "next/head";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import Link from "next/link";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((s: RootState) => s?.orders?.orders);

  return (
    <>
      <Head>
        <title>Orders | Shop Hub</title>
      </Head>

      <Typography variant="h4" sx={{ mb: 3 }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found</Typography>
      ) : (
        orders.map((order: any) => (
          <Box
            key={order.id}
            sx={{
              border: "1px solid #eee",
              p: 2,
              mb: 2,
            }}
          >
            <Typography>
              Order #{order.id} • ₹{order.total}
            </Typography>
            <Typography>Status: {order.status}</Typography>

            <Button
              sx={{ mt: 1 }}
              onClick={() => {
                order.items.forEach((item: any) =>
                  dispatch(addToCart({ ...item, quantity: item.quantity }))
                );
              }}
            >
              Reorder
            </Button>
          </Box>
        ))
      )}

      <Link href="/">
        <Button sx={{ mt: 3 }}>Continue Shopping</Button>
      </Link>
    </>
  );
}
