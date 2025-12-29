import { AppDispatch } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function OrderCard({ order }: any) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <div>
            <Typography fontWeight={600}>Order #{order.id}</Typography>
            <Typography variant="body2">
              {order.date} • {order.itemsCount} items
            </Typography>
            <Typography variant="body2">
              Delivered to: {order.address}
            </Typography>
            <Typography variant="body2">
              Payment: {order.paymentMethod}
            </Typography>
          </div>

          <div>
            <Chip
              label={order.status}
              color={
                order.status === "Delivered"
                  ? "success"
                  : order.status === "Shipped"
                  ? "warning"
                  : "default"
              }
            />
            <Typography fontWeight={600} sx={{ mt: 1 }}>
              ₹{order.total}
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            size="small"
            onClick={() => router.push(`/orders/${order.id}`)}
          >
            View Details
          </Button>
          <Button size="small">Track Order</Button>
          <Button size="small">Download Invoice</Button>
          <Button size="small" color="error">
            Cancel
          </Button>
          <Button
            onClick={() => {
              order.items.forEach((i: any) =>
                dispatch(addToCart({ ...i.product, quantity: i.quantity }))
              );
              router.push("/cart");
            }}
          >
            Reorder
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
