import { useState, useMemo } from "react";
import Head from "next/head";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Chip,
  Container,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/store/slices/cartSlice";
import Link from "next/link";
import { useGetOrdersQuery } from "@/store/api/apiSlice";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReplayIcon from "@mui/icons-material/Replay";
import FilterListIcon from "@mui/icons-material/FilterList";
import Loader from "@/components/atoms/Loader";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const { data: totalOrders, isLoading, isError } = useGetOrdersQuery();

  const years = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => (currentYear - i).toString());
  }, [currentYear]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success";
      case "processing":
        return "info";
      case "cancelled":
        return "error";
      default:
        return "warning";
    }
  };

  const handleReorder = (items: any[]) => {
    items.forEach((item) => {
      dispatch(addItemToCart({ ...item, quantity: item.quantity }));
    });
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          height: "100vh",
        }}
      >
        <Loader isComponentLevel />
      </Box>
    );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Head>
        <title>Orders | Shop Hub</title>
      </Head>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <ShoppingBagIcon fontSize="large" color="primary" />
        <Typography variant="h4" fontWeight="bold">
          My Orders
        </Typography>
      </Stack>

      <Box sx={{ mb: 4, borderBottom: 1, borderColor: "divider" }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <FilterListIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            Filter by Year
          </Typography>
        </Stack>
        <Tabs
          value={selectedYear}
          onChange={(_, newValue) => setSelectedYear(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {years.map((year) => (
            <Tab
              key={year}
              label={year}
              value={year}
              sx={{ textTransform: "none" }}
            />
          ))}
          <Tab label="All Time" value="all" sx={{ textTransform: "none" }} />
        </Tabs>
      </Box>

      {totalOrders?.length === 0 || isError ? (
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            bgcolor: "grey.50",
            border: "1px dashed #ccc",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No orders found for{" "}
            {selectedYear === "all" ? "any year" : selectedYear}
          </Typography>
          <Link href="/" passHref>
            <Button variant="contained" sx={{ mt: 2 }}>
              Start Shopping
            </Button>
          </Link>
        </Card>
      ) : (
        totalOrders?.map((order: any) => (
          <Card
            key={order?.order_number}
            variant="outlined"
            sx={{
              mb: 3,
              borderRadius: 2,
              transition: "0.3s",
              "&:hover": { boxShadow: 3 },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    ORDER PLACED: {order?.created_at?.split("T")?.[0] || "N/A"}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    #{order?.order_number}
                  </Typography>
                </Box>
                <Chip
                  label={order?.status?.toUpperCase()}
                  color={getStatusColor(order?.status) as any}
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Amount
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight="bold"
                  >
                    ₹{order?.total_amount?.toLocaleString()}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<ReplayIcon />}
                  onClick={() => handleReorder(order.items)}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    bgcolor: "#f5f5f5",
                    "&:hover": { bgcolor: "#e0e0e0" },
                  }}
                >
                  Reorder
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <Button color="primary">← Back to Shop</Button>
        </Link>
      </Box>
    </Container>
  );
}
