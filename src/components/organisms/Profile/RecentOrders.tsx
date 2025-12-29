import { Box, Typography, Button } from "@mui/material";
import orders from "@/mock-data/orders";
import { useRouter } from "next/router";

export default function RecentOrders() {
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h6">Recent Orders</Typography>
      {orders.slice(0, 3).map((o) => (
        <Box key={o.id} sx={{ mt: 2 }}>
          <Typography>
            #{o.id} • ₹{o.total}
          </Typography>
        </Box>
      ))}
      <Button sx={{ mt: 2 }} onClick={() => router.push("/orders")}>
        View All Orders
      </Button>
    </Box>
  );
}
