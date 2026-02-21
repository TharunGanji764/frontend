import { Box, Typography, Button, Stack } from "@mui/material";
import orders from "@/mock-data/orders";
import { useRouter } from "next/router";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import {
  ProfileSectionCard,
  ProfileSectionHeader,
  OrdersRow,
  OrdersIconBox,
  OrdersStatusChip,
  OrdersEmptyState,
} from "./styles";

const statusConfig: Record<
  string,
  { label: string; bg: string; color: string }
> = {
  delivered: {
    label: "Delivered",
    bg: "rgba(22,163,74,0.10)",
    color: "#16A34A",
  },
  shipped: { label: "Shipped", bg: "rgba(245,158,11,0.10)", color: "#F59E0B" },
  pending: { label: "Pending", bg: "rgba(245,158,11,0.10)", color: "#F59E0B" },
  cancelled: {
    label: "Cancelled",
    bg: "rgba(220,38,18,0.10)",
    color: "#DC2612",
  },
  processing: {
    label: "Processing",
    bg: "rgba(17,24,39,0.07)",
    color: "#111827",
  },
};

function getStatusStyle(status: string) {
  return (
    statusConfig[status?.toLowerCase()] ?? {
      label: status ?? "Unknown",
      bg: "rgba(17,24,39,0.07)",
      color: "#111827",
    }
  );
}

export default function RecentOrders() {
  const router = useRouter();
  const recentOrders = orders.slice(0, 3);

  return (
    <ProfileSectionCard elevation={0}>
      {/* ── Header ── */}
      <ProfileSectionHeader>
        <Typography
          sx={{ fontSize: "0.875rem", fontWeight: 700, color: "text.primary" }}
        >
          Recent Orders
        </Typography>
        <Button
          endIcon={<ArrowForwardIcon sx={{ fontSize: "0.85rem !important" }} />}
          onClick={() => router.push("/orders")}
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: "0.729vw",
            letterSpacing: "0.06em",
            color: "text.primary",
            padding: "0.38rem 0.8rem",
            borderRadius: "8px",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          View All
        </Button>
      </ProfileSectionHeader>

      {/* ── Order list ── */}
      <Box sx={{ px: "1.5rem" }}>
        {recentOrders.length === 0 ? (
          <OrdersEmptyState>
            <ReceiptLongOutlinedIcon
              sx={{ fontSize: "2.5rem", color: "text.secondary", mb: 1 }}
            />
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              No orders yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Your recent orders will appear here
            </Typography>
          </OrdersEmptyState>
        ) : (
          recentOrders.map((order, index) => {
            const status = getStatusStyle(order.status);

            return (
              <OrdersRow
                key={order.id}
                sx={{
                  borderBottom:
                    index < recentOrders.length - 1 ? "1px solid" : "none",
                  borderColor: "divider",
                }}
              >
                {/* Icon */}
                <OrdersIconBox>
                  <ShoppingBagOutlinedIcon sx={{ fontSize: "1rem" }} />
                </OrdersIconBox>

                {/* Details */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "text.primary",
                      lineHeight: 1.3,
                    }}
                  >
                    Order #{order.id}
                  </Typography>
                  {order.date && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.4}
                      sx={{ mt: 0.35 }}
                    >
                      <CalendarTodayOutlinedIcon
                        sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {order.date}
                      </Typography>
                    </Stack>
                  )}
                  {order.items && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.2 }}
                    >
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </Typography>
                  )}
                </Box>

                {/* Status + total */}
                <Stack
                  direction="column"
                  alignItems="flex-end"
                  spacing={0.6}
                  sx={{ flexShrink: 0 }}
                >
                  <OrdersStatusChip
                    sx={{ background: status.bg, color: status.color }}
                  >
                    {status.label}
                  </OrdersStatusChip>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  >
                    ₹{order.total}
                  </Typography>
                </Stack>
              </OrdersRow>
            );
          })
        )}
      </Box>

      {/* ── Footer CTA ── */}
      {recentOrders.length > 0 && (
        <Box
          sx={{
            px: "1.5rem",
            py: "1rem",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            endIcon={
              <ArrowForwardIcon sx={{ fontSize: "0.85rem !important" }} />
            }
            onClick={() => router.push("/orders")}
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: "0.729vw",
              letterSpacing: "0.06em",
              borderColor: "divider",
              color: "text.primary",
              borderRadius: "8px",
              py: "0.55rem",
              "&:hover": {
                borderColor: "text.primary",
                bgcolor: "action.hover",
              },
            }}
          >
            View All Orders
          </Button>
        </Box>
      )}
    </ProfileSectionCard>
  );
}
