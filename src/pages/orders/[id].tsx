import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import orders from "@/mock-data/orders";
import OrderTrackingStepper from "@/components/organisms/Orders/OrderTrackingStepper";

export default function OrderDetailsPage() {
  const { query } = useRouter();
  const order = orders.find((o) => o.id === query.id);

  if (!order) return <Typography>Order not found</Typography>;

  return (
    <>
      <Head>
        <title>Order {order.id} | Shop Hub</title>
        <meta name="description" content={`Details for order ${order.id}`} />
      </Head>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Order #{order.id}</Typography>
        <Typography>Estimated delivery: {order.estimatedDelivery}</Typography>

        <Box sx={{ mt: 3 }}>
          <OrderTrackingStepper status={order.status} />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Items</Typography>
          {order.items.map((i: any) => (
            <Typography key={i.id}>
              {i.title} × {i.qty}
            </Typography>
          ))}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Total: ₹{order.total}</Typography>
          <Typography>Payment: {order.paymentMethod}</Typography>
          <Typography>Address: {order.address}</Typography>
        </Box>
      </Box>
    </>
  );
}
