import { Box, Typography, Button, Divider } from "@mui/material";
import orders from "@/mock-data/orders";
import { useRouter } from "next/router";

export default function RecentOrders() {
  const router = useRouter();

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Recent Orders
      </Typography>

      {orders.slice(0, 3).map((o) => (
        <Box key={o.id} sx={{ py: 1.5 }}>
          <Typography color="text.primary">Order #{o.id}</Typography>
          <Typography color="text.secondary">₹{o.total}</Typography>
          <Divider sx={{ mt: 1.5 }} />
        </Box>
      ))}

      <Button sx={{ mt: 3 }} onClick={() => router.push("/orders")}>
        View All Orders
      </Button>
    </Box>
  );
}
